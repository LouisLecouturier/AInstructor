"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Header from "@components/Dashboard/Common/Layout/Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeam } from "@requests/team";
import TeamInformations from "@/components/Dashboard/Teams/MainInformation";
import { toastStore } from "@components/Layout/Toast/toast.store";

export default function AddTeam() {
  const { data: session } = useSession();
  const token = String(session?.user.accessToken);
  const router = useRouter();

  const openToast = toastStore((state) => state.openToast);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (team: { name: string; description: string; color: string }) =>
      createTeam(team, String(token)),
    onMutate: () => {
      openToast("info", "Creating team...");
    },
    onSuccess: () => {
      openToast("success", "Team created successfully");
      router.push("/dashboard/teachers/teams");
      queryClient.invalidateQueries(["teams"]);
    },
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
    } as { name: string; description: string; color: string };

    mutation.mutate(team);
  };

  return (
    <>
      <Header title={"Create a new team"} />
      <TeamInformations editable onSubmit={handleSubmit} />
      <TeamInformations onSubmit={handleSubmit} editable={true} />
    </>
  );
}
