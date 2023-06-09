"use client";

import { Button } from "@/components/Interactions/Button";
import Input from "@/components/Interactions/Forms/Input";
import TeamMainInformation, {
  TeamInformations,
} from "@/components/dashboard/Teams/MainInformation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import newTeam from "./hook";
import Container from "@components/layout/Container";
import Header from "@components/dashboard/Layout/Header";

export default function AddTeam() {
  const { data: session } = useSession();
  const [IsError, setIsError] = React.useState(false);
  const id = String(session?.user.user_id);
  const token = String(session?.user["acces token"]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;

    const error = await newTeam(name, description, color, id, token);

    error ? setIsError(error) : router.push("/dashboard/teachers/teams");
  };

  return (
    <>
      <Header>Create a new team</Header>
      <TeamInformations handleSubmit={handleSubmit} />
    </>
  );
}
