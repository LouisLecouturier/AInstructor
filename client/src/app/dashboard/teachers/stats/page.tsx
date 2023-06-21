'use client';

import React from "react";
import Link from "next/link";
import CubeTeams from "@/components/dashboard/Teachers/Stats";
import Header from "@/components/dashboard/Layout/Header";
import Container from "@/components/layout/Container";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamsUser } from "@/requests/team";
import { useSession } from "next-auth/react";
import { Team } from "@/types/team";
import { nanoid } from "nanoid";



export default function Teams() {
  const {data : session} = useSession();
  const token = session?.user.accessToken;

  const { data : teams, isLoading, isError } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: () => fetchTeamsUser(String(token)),
    enabled: !!token,
  });

  if (isLoading || isError) return <div>Loading...</div>;



  return (
    <div className="flex flex-col gap-5">
      <Header title="Stats" />
      <div className="flex flex-col gap-10">
        <Container title="My teams" className=" w-full">
          <div className="flex gap-8 flex-wrap ">
            {teams.map((team) => (
              <CubeTeams uuid={team.uuid} key={nanoid()} color={team.color} name={team.name} />
            ))}
          </div>
          <Link
            className="rounded-xl w-fit h-15 "
            href={`/dashboard/teachers/stats/teams/myteams`}
          >
            <div className="px-4 py-3 rounded-xl font-bold text-accent-500 text-lg border-2 border-dark-50 hover:border-accent-300 transition">
            View global statistics

            </div>
          </Link>
        </Container>
      </div>
    </div>
  );
}
