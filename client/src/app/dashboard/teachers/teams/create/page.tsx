"use client";

import { TeamInformations } from "@components/Dashboard/Teams/MainInformation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use } from "react";
// import newTeam from "./hook";
import Header from "@components/Dashboard/Layout/Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeam } from "@requests/team";

export default function AddTeam() {
  const { data: session } = useSession();
  const token = String(session?.user.accessToken);
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (team : {name : string, description : string, color : string}) => createTeam(team, String(token)),
    onSuccess: () => {
      router.push("/dashboard/teachers/teams");
      queryClient.invalidateQueries(["teams"]);
    }
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;

    const team = {
      name,
      description,
      color,
    } as {name : string, description : string, color : string};


    mutation.mutate(team);
  };

  return (
    <>
      <Header title={"Create a new team"} />
      <TeamInformations onSubmit={handleSubmit} />
    </>
  );
}
