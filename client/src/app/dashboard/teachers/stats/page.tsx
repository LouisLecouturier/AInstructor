"use client";

import React from "react";
import Link from "next/link";

import CubeTeams from "@/components/Dashboard/Teachers/Stats";

import { useQuery } from "@tanstack/react-query";
import { fetchTeamsUser } from "@/requests/team";
import { useSession } from "next-auth/react";
import { Team } from "@/types/team";
import { nanoid } from "nanoid";
import Container from "@/components/Layout/Container";
import Header from "@/components/Dashboard/Common/Layout/Header";
import ListItem from "@/components/Layout/ListItem";
import clsx from "clsx";
import { getCourses } from "@/requests/course";
import { Course } from "@/types/course";

export default function Teams() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const {
    data: teams,
    isLoading,
    isError,
  } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: () => fetchTeamsUser(String(token)),
    enabled: !!token,
  });


  const { data : courses, isLoading : isCoursesLoading, isError : isCoursesError } = useQuery<Course[]>(["courses"], {
    queryFn: async () => {
      const yee = await getCourses(String(token), String(id));
      console.log(yee);
      return yee;
    },
    enabled: ![token, id].includes(undefined),
  });

  if (isLoading || isError || isCoursesError || isCoursesLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5">
      <Header title="Stats" />
      <div className="flex flex-col gap-10">
        <Container title="Your teams" className=" w-full">
          <div className="flex gap-8 flex-wrap ">
            {teams.map((team) => (
              <CubeTeams
                uuid={team.uuid}
                key={nanoid()}
                color={team.color}
                name={team.name}
                href={`/dashboard/teachers/stats/teams/${team.uuid}`}
              />
            ))}
          </div>
          <Link
            className="rounded-xl w-fit h-15 "
            href={`/dashboard/teachers/stats/teams/myteams`}
          >
            {/* <div className="px-4 py-3 rounded-xl font-bold text-accent-500 text-lg border-2 border-dark-50 hover:border-accent-300 transition">
              View global statistics
            </div> */}
            
          </Link>
        </Container>
        <Container
          title={"Your courses"}
          description={"Preview, manage, delete your courses"}
        >
          <div className={"flex flex-col gap-2"}>
            {isLoading || isError ? (
              Array.from({ length: 2 }).map(() => (
                <ListItem properties={[]} key={nanoid()} isLoading />
              ))
            ) : courses.length > 0 ? (
              courses.map((course) => {
                const properties = [
                  { label: "Creation date", value: course.creationDate },
                  { label: "Delivery date", value: course.deliveryDate },
                  { label: "Team", value: course.team },
                ];

                return (
                  <ListItem
                    key={nanoid()}
                    properties={properties}
                    href={`/dashboard/teachers/stats/courses/${course.uuid}`}
                  >
                    {course.name}
                  </ListItem>
                );
              })
            ) : (
              <div
                className={clsx(
                  "flex flex-col gap-2",
                  "py-8",
                  "text-sm font-bold text-center text-dark-200 bg-dark-10 rounded-md"
                )}
              >
                <span>You don&apos;t have any course</span>
                <Link
                  className={"text-accent-500 underline"}
                  href={"/dashboard/teachers/courses/create"}
                >
                  Create one
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
