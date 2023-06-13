"use client";

import {TeamInformations,} from "@/components/dashboard/Teams/MainInformation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Header from "@components/dashboard/Layout/Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {createTeam  } from "@/request";


export default function AddTeam() {
  const router = useRouter();
  
  const { data: session } = useSession();
  const token = String(session?.user.accessToken);
  
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (team: {name: string, description : string, color : string}) => createTeam(team, token),
    onSuccess: () => {
      router.push("/dashboard/teachers/teams");
      queryClient.invalidateQueries(["teams"]);
      
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const team = {
      name: String(formData.get("name")),
      description: String(formData.get("description")),
      color: String(formData.get("color")),
    }

    mutation.mutate(team);
  };

  return (
    <>
      <Header>Create a new team</Header>
      <TeamInformations onSubmit={handleSubmit} />
    </>
  );
}
