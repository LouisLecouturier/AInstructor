"use client";
import React from "react";
import styles from "./Teams.module.scss";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import TeamCard from "@components/Dashboard/Common/Cards/TeamCard";
import Header from "@components/Dashboard/Common/Layout/Header";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamsUser } from "@/requests/team";

const Teams = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const { data, isLoading, isError } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: () => fetchTeamsUser(String(token)),
    enabled: !!token,
  });

  if (isError) {
    return (
      <div className={clsx("flex-1 h-full flex flex-col gap-6", styles.teams)}>
        <Header title={"Teams"} />

        <div className={clsx("w-full max-w-[500px] h-20 rounded-xl shadow-md",
          "flex items-center justify-center",
          "border-2 border-solid border-secondary-500"
        
        )}>
          <span className="text-xl font-bold text-secondary-500">
            Error while loading Teams
          </span>

        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className={clsx("flex-1 h-full flex flex-col gap-6", styles.teams)}>
        <Header title={"Teams"} />

        <div className={clsx("w-full flex-1",)}>
          <span className="text-2xl animate-pulse font-bold text-dark-500">
            Loading ...
          </span>
        </div>
      </div>
    );

  }


  return (
    <div className={clsx("flex-1 h-full flex flex-col gap-6", styles.teams)}>
      <Header title={"Teams"} />

      <div className="flex w-full flex-wrap pt-6 pb-16 gap-10">
        {data?.map((team) => (
          <TeamCard key={team.uuid} team={team} />
        ))}
        <TeamCard className={"justify-center gap-0"} isAddCard />
      </div>
    </div>
  );
};

export default Teams;
