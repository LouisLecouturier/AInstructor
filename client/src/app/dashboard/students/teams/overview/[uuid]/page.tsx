"use client";
import React from "react";

import { useSession } from "next-auth/react";
import TeamMainInformation from "@components/Dashboard/Teams/MainInformation";

import Container from "@components/Layout/Container";
import Table from "@components/Dashboard/Common/Layout/Table";
import { useQuery } from "@tanstack/react-query";
import { Team } from "@/types/team";
import { fetchTeam, getCoursesTeam } from "@requests/team";
import Header from "@components/Dashboard/Common/Layout/Header";
import ListItem from "@components/Layout/ListItem";
import { Course } from "@/types/course";
import { nanoid } from "nanoid";
import Skeleton from "@components/Layout/Skeleton";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";

export default function TeamOverview({ params }: { params: { uuid: string } }) {
  const { data: session } = useSession();

  const token = session?.user.accessToken;
  const uuid = params.uuid;

  const { data, isLoading, isError } = useQuery<Team>({
    queryKey: ["team", uuid],
    queryFn: () => fetchTeam(String(token), uuid),
    enabled: ![token, uuid].includes(undefined),
  });

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery<Course[]>(["team", uuid, "courses"], {
    queryFn: () => getCoursesTeam(String(uuid), String(token)),
    enabled: ![token, uuid].includes(undefined),
  });

  if (isError || isCoursesError) {
    return (
      <>
        <Header className={"justify-between"} title={"Ooops..."} />

        <div className="flex flex-col gap-10">
          <div className={"flex flex-col gap-4"}>
            <Container title={"Your courses"}>
              <ContainerMessage>
                An error occurred while loading team courses.
              </ContainerMessage>
            </Container>
          </div>
          <div className={"flex flex-col gap-4"}>
            <Container title={"Team informations"}>
              <ContainerMessage>
                An error occurred while loading team informations.
              </ContainerMessage>
            </Container>
            <Container title={"Members"}>
              <ContainerMessage>
                An error occurred while loading team members.
              </ContainerMessage>
            </Container>
          </div>
        </div>
      </>
    );
  }

  if (isLoading || isCoursesLoading) {
    return (
      <>
        <Header className={"justify-between"} title={"Loading..."} />

        <div className="flex flex-col gap-10">
          <div className={"flex flex-col gap-4"}>
            <Container title={"Your courses"}>
              <div className={"flex flex-col gap-2"}>
                {Array.from({ length: 3 }).map(() => (
                  <ListItem
                    key={nanoid()}
                    isLoading
                    properties={[]}
                    href={""}
                  />
                ))}
              </div>
            </Container>
          </div>
          <div className={"flex flex-col gap-4"}>
            <Container title={"Team informations"}>
              <Skeleton className={"w-full h-40"} />
            </Container>
            <Container title={"Members"}>
              <Skeleton className={"w-full h-40"} />
            </Container>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header className={"justify-between"} title={data.name}></Header>

      <div className="flex flex-col gap-10">
        <div className={"flex flex-col gap-4"}>
          <Container title={"Your courses"}>
            <div className={"flex flex-col gap-2"}>
              {courses.length > 0 ? (
                courses.map((course) => {
                  const properties = [
                    { label: "Subject", value: course.subject },
                  ];

                  return (
                    <ListItem
                      key={nanoid()}
                      properties={properties}
                      href={`http://localhost:3000/dashboard/students/courses/${course.uuid}`}
                    >
                      {course.name}
                    </ListItem>
                  );
                })
              ) : (
                <span>You don&apos;t have any course yet</span>
              )}
            </div>
          </Container>
        </div>
        <div className={"flex flex-col gap-4"}>
          <TeamMainInformation team={data} />

          <Container title={"Members"}>
            <Table
              columns={[
                { key: "first_name", label: "Firstname" },
                { key: "last_name", label: "Lastname" },
                { key: "email", label: "Email" },
                { key: "isTeacher", label: "Teacher" },
              ]}
              ordered
              data={data.users || []}
            />
          </Container>
        </div>
      </div>
    </>
  );
}
