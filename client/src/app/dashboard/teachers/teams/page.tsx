"use client";
import React from "react";
import SortbyButton from "@/components/button/sortbybutton";
import styles from "./Teams.module.scss";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import TeamCard from "@/components/dashboard/Cards/TeamCard";
import Header from "@components/dashboard/Layout/Header";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (token: string) => {
  console.log("fetch");
  const response = await fetch("http://localhost:8000/api/team/", {
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data.teams || [];
};

const Teams = () => {
  const { data: session } = useSession();
  console.log(session);
  const token = String(session?.user.accessToken);

  const { data, isLoading } = useQuery<Team[]>(["teams"], () =>
    fetchData(token)
  );

  if (isLoading) {
    return (
      <div className={clsx("flex-1 h-full flex flex-col gap-6", styles.teams)}>
        <Header>Teams</Header>

        <SortbyButton />

        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className={clsx("flex-1 h-full flex flex-col gap-6", styles.teams)}>
      <Header>Teams</Header>

      <SortbyButton />

      <div className="flex w-full flex-wrap pt-6 pb-16 gap-10">
        {data?.map((team, i) => (
          <TeamCard key={team.uuid} team={team} />
        ))}
        <TeamCard className={"justify-center gap-0"} isAddCard />
      </div>
    </div>
  );
};

export default Teams;
