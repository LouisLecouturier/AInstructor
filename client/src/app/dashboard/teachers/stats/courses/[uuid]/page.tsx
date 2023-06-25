"use client";

import Header from "@/components/Dashboard/Common/Layout/Header";
import CubeTeams from "@/components/Dashboard/Teachers/Stats";
import Container from "@/components/Layout/Container";
import { getTeamsCourse } from "@/requests/course";
import { Course } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CourseList() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const uuid = pathname?.split("/")[5];

  const token = session?.user.accessToken;
  const id = session?.user.id;

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery<Course>({
    queryKey: ["course", uuid, "teams"],
    queryFn: () => getTeamsCourse(String(uuid), String(token)),
    enabled: !!token && !!uuid,
  });

  if (isLoading || isError) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Header
        breadcrumbsReplace={[{ current: String(uuid), value: course.name }]}
        title={"Choose a team"}
      />

      <Container title="Your teams" className=" w-full">
        <div className="flex gap-8 flex-wrap ">
          {course.teams.map((team) => (
            <CubeTeams
              uuid={team.uuid}
              key={nanoid()}
              color={team.color}
              name={team.name}
              href={`/dashboard/teachers/stats/courses/${course.uuid}/${team.uuid}`}
            />
          ))}
        </div>
        <Link
          className="rounded-xl w-fit h-15 "
          href={`/dashboard/teachers/stats/courses/${course.uuid}/global`}
        >
          <div className="px-4 py-3 rounded-xl font-bold text-accent-500 text-lg border-2 border-dark-50 hover:border-accent-300 transition">
            View global statistics
          </div>
        </Link>
      </Container>
    </>
  );
}
