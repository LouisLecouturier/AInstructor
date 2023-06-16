"use client";

import React, { useRef, useState } from "react";
import Container from "@components/layout/Container";
import Header from "@components/dashboard/Layout/Header";
import Information from "@components/layout/Information";
import { Button } from "@components/Interactions/Button";

import EditIcon from "@icons/Edit.svg";
import CheckIcon from "@icons/Checkmark.svg";
import Table from "@components/dashboard/Table";
import QuestionsManager from "@components/dashboard/Teachers/QuestionsManager";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTeamsUser } from "@/request";
import { updateCourseTeams } from "@/requests/courses";

const courseQuery = async (uuid: string, accessToken: string) => {
  const res = await fetch(`http://127.0.0.1:8000/api/course/byId/${uuid}`, {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  });

  const data = await res.json();
  return data;
};

const ManageCourse = (searchParams: { params: { uuid: string } }) => {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);

  const { uuid } = searchParams.params;


    const { data: courseData, isLoading: courseLoading, isError : courseError } = useQuery({
        queryKey: ["course", params.uuid],
        queryFn: () => courseQuery(params.uuid, String(token)),
        enabled: ![params.uuid, token].includes(undefined),
    });


    const { data : teamsData, isLoading: teamsLoading, isError : teamsError } = useQuery({
        queryKey: ["teams"],
        queryFn: () => fetchTeamsUser(String(token)),
        enabled: token !== undefined,
    });

    const mutationCourseTeams = useMutation({
        mutationFn: (teamUUID : string[]) => updateCourseTeams(params.uuid, String(token), teamUUID),
        onSuccess: () => {
        queryClient.invalidateQueries(["course", params.uuid]);
        }
    });

    const getTeamsUUID = (selected : {uuid :string}[]) => {
        const selectedUUID = selected.map((obj) => obj.uuid);
        mutationCourseTeams.mutate(selectedUUID);
    }



  const handleUpdate = (e: HTMLFormElement) => {
    const formData = new FormData(e);
    const data = Object.fromEntries(formData.entries());
    setIsEditing(false);
  };

  if (courseLoading || courseError || teamsLoading || teamsError) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header>Manage course</Header>
      <main className={"flex flex-col gap-8"}>
        <Container
          title={"Course informations"}
          description={"Manage your course"}
          action={
            <Button
              size={"sm"}
              onClick={() => {
                if (isEditing && formRef.current) {
                  handleUpdate(formRef.current);
                  return;
                }
                setIsEditing(true);
              }}
            >
              {isEditing ? (
                <>
                  <CheckIcon className={"w-4 h-4"} />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <EditIcon className={"w-4 h-4"} />
                  <span>Edit</span>
                </>
              )}
            </Button>
          }
        >
          <form ref={formRef} className={"flex flex-col gap-4"}>
            <div className={"flex gap-4"}>
              <div className={"flex flex-col gap-2 flex-1"}>
                <Information
                  label={"Name"}
                  name={"name"}
                  value={coursesData?.name}
                  isLoading={coursesLoading}
                  editable={isEditing}
                />
                <Information
                  label={"Description"}
                  name={"description"}
                  value={coursesData?.description}
                  isLoading={coursesLoading}
                  editable={isEditing}
                  isTextArea
                />
              </div>
              <div className={"flex flex-col gap-2 flex-1"}>
                <Information
                  label={"Subject"}
                  name={"subject"}
                  value={coursesData?.subject}
                  isLoading={coursesLoading}
                  editable={isEditing}
                />
                <Information
                  label={"File uploaded"}
                  name={"file"}
                  value={coursesData?.file.split("/").at(-1).replace(".md", "")}
                  isLoading={coursesLoading}
                  editable={isEditing}
                />
              </div>
            </div>
          </form>
        </Container>

        <Container title={"Manage team access"} description={"Assign this course to your teams"}>
            <Table
                columns={[{ key: "name", label: "Name" }]}
                data={teamsData}
                ordered
                selectable
                selectedRows={courseData.teams}
                Submit={(selected) => getTeamsUUID(selected)}
                // inlineActions={false}
            />
        </Container>


        <QuestionsManager courseUuid={uuid} />
      </main>
    </div>
  );
};

export default ManageCourse;