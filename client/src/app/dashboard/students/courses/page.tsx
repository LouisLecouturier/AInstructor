"use client";
import React from "react";
import ListItem from "@components/Layout/ListItem";

import Header from "@components/Dashboard/Layout/Header";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "@requests/course";
import Container from "@components/Layout/Container";

type Course = {
  uuid: string;
  name: string;
  creationDate: string;
  deliveryDate: string;
  team: string;
  status: "pending" | "in-progress" | "done";
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

  if (isLoading || isError) {
    return <div>Loading...</div>;
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
    <div>
      <Header title={"My courses"} />

      <main>
        <div className={"flex flex-col gap-6"}>
          {Array.from(sections).map(([team, courses]) => {
            return (
              <Container title={team} key={team}>
                {courses.map((course: any) => {
                  const properties = [
                    { label: "Creation date", value: course.creationDate },
                    // { label: "Delivery date", value: course.deliveryDate },
                    { label: "Team", value: course.team },
                  ];

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
        </div>
      </main>
    </div>
  );
};

export default MyCourses;
