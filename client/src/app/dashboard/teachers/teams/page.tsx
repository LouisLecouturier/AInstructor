"use client";
import React from "react";
import styles from "./Teams.module.scss";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import TeamCard from "@/components/dashboard/Cards/TeamCard";
import Header from "@components/dashboard/Layout/Header";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamsUser } from "@/request";

const Teams = () => {
  const { data: session } = useSession();

  const token = session?.user.accessToken;

  const { data, isLoading, isError } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: () => fetchTeamsUser(String(token)),
    enabled: token !== undefined,
  });

  if (isLoading || isError) {
    console.log("loading");
    return (
      <div className={clsx("flex-1 h-full flex flex-col gap-6", styles.teams)}>
        <Header>Teams</Header>

        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className={clsx("flex-1 h-full flex flex-col gap-6", styles.teams)}>
      <Header>Teams</Header>

      <div className="flex w-full flex-wrap pt-6 pb-16 gap-10">
        {data.map((team, i) => (
          <TeamCard key={team.uuid} team={team} />
        ))}
        <TeamCard className={"justify-center gap-0"} isAddCard />
      </div>
    </div>
  );
};

export default Teams;
