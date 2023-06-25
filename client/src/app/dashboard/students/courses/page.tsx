"use client";
import React from "react";
import ListItem from "@components/Layout/ListItem";

import Header from "@components/Dashboard/Common/Layout/Header";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "@requests/course";
import Container from "@components/Layout/Container";
import { nanoid } from "nanoid";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";

type Course = {
  uuid: string;
  name: string;
  creationDate: string;
  deliveryDate: string;
  team: string;
  status: "pending" | "late" | "finished";
  progress: number;
};

const MyCourses = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const { data, isLoading, isError } = useQuery<Course[]>({
    queryKey: ["courses", id],
    queryFn: () => fetchCourses(String(token), String(id)),
    enabled: (token || id) !== undefined,
  });

  if (isError) {
    return (
      <>
        <Header title={"My courses"} />

        <main className={"flex flex-col gap-6"}>
          <Container title={"Ooops..."}>
            <ContainerMessage>
              An error occurred while fetching your courses.
            </ContainerMessage>
          </Container>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header title={"My courses"} />
        <main className={"flex flex-col gap-6"}>
          {Array.from({ length: 3 }).map(() => (
            <Container title={"Loading teams..."} key={nanoid()}>
              <div className={"flex flex-col gap-2"}>
                {Array.from({ length: 2 }).map(() => (
                  <ListItem
                    href={""}
                    status={"pending"}
                    key={nanoid()}
                    isLoading={true}
                    properties={[]}
                  />
                ))}
              </div>
            </Container>
          ))}
        </main>
      </>
    );
  }

  // Group courses by team
  const sections = data.reduce((acc, course) => {
    const team = course.team;

    if (acc.has(team)) {
      acc.get(team).push(course);
    } else {
      acc.set(team, [course]);
    }

    return acc;
  }, new Map());

  return (
    <>
      <Header title={"My courses"} />

      <main className={"flex flex-col gap-6"}>
        {Array.from(sections).map(([team, courses]) => {
          return (
            <Container title={team} key={nanoid()}>
              {courses.map((course: any) => {
                const properties = [
                  { label: "Creation date", value: course.creationDate },
                  { label: "Team", value: course.team },
                  { label: "Progress", value: course.progress + "%" },
                ];
                if (course.deliveryDate !== null) {
                  properties.push({
                    label: "Delivery date",
                    value: course.deliveryDate,
                  });
                }

                return (
                  <ListItem
                    href={`/dashboard/students/courses/${course.uuid}`}
                    status={course.status}
                    key={course.name}
                    properties={properties}
                  >
                    {course.name}
                  </ListItem>
                );
              })}
            </Container>
          );
        })}
      </main>
    </>
  );
};

export default MyCourses;
