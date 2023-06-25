"use client";

import React from "react";
import Header from "@components/Dashboard/Common/Layout/Header";
import QuestionsManager from "../../../../../../components/Dashboard/Teachers/Course/QuestionsManager";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamsUser } from "@/requests/team";

import InformationEditor from "@components/Dashboard/Teachers/Course/InformationEditor";
import TeamsEditor from "@components/Dashboard/Teachers/Course/TeamsEditor";

const courseQuery = async (uuid: string, accessToken: string) => {
  const res = await fetch(`http://localhost:8000/api/course/byId/${uuid}`, {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  });

  return await res.json();
};

const ManageCourse = ({ params }: { params: { uuid: string } }) => {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const COURSE_UUID = params.uuid;

  const {
    data: courseData,
    isLoading: courseLoading,
    isError: courseError,
  } = useQuery({
    queryKey: ["course", COURSE_UUID],
    queryFn: () => courseQuery(COURSE_UUID, String(accessToken)),
    enabled: ![COURSE_UUID, accessToken].includes(undefined),
  });

  const {
    data: teamsData,
    isLoading: teamsLoading,
    isError: teamsError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: () => fetchTeamsUser(String(accessToken)),
    enabled: !!accessToken,
  });

  return (
    <div>
      <Header
        title={"Manage course"}
        breadcrumbsReplace={[
          {
            current: courseData?.uuid,
            value: courseLoading || courseError ? "course" : courseData.name,
          },
        ]}
      />
      <main className={"flex flex-col gap-8"}>
        <InformationEditor
          uuid={COURSE_UUID}
          data={courseData}
          isLoading={courseLoading}
          isError={courseError}
        />

        <TeamsEditor
          uuid={COURSE_UUID}
          data={teamsData}
          courseData={courseData}
          isLoading={teamsLoading}
          isError={teamsError}
        />

        <QuestionsManager courseUuid={COURSE_UUID} />
      </main>
    </div>
  );
};

export default ManageCourse;
