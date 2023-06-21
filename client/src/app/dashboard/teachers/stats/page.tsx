"use client";

import React from "react";
import CubeTeams from "@/components/Dashboard/Teachers/Stats";
import Header from "@components/Dashboard/Common/Layout/Header";
import { Button } from "@components/Layout/Interactions/Button";
import { useRouter } from "next/navigation";
import Container from "@components/Layout/Container";

const teams = [
  {
    id: 1,
    name: "Groupe 1",
    score: 12,
    moy: 50,
    effectif: 12,
  },
  {
    id: 2,
    name: "Groupe 2",
    score: 52,
    moy: 32,
    effectif: 12,
  },
  {
    id: 3,
    name: "Groupe 3",
    score: 69,
    moy: 10,
    effectif: 12,
  },
];

export default function Teams() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <Header title={"Stats"} />
      <div className="flex flex-col gap-10">
        <Container title="My teams">
          <div className="flex gap-4 flex-wrap">
            {teams.map((teams) => (
              <CubeTeams uuid={teams.id} key={teams.name} name={teams.name} />
            ))}
          </div>
          <Button
            rounded={"full"}
            onClick={() =>
              router.push("/dashboard/teachers/stats/teams/myteams")
            }
          >
            Accéder à toutes mes stats de team
          </Button>
        </Container>
      </div>
    </div>
  );
}
