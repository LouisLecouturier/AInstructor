import React from "react";
import Link from "next/link";

type Team = {
  uuid?: number;
  index?: number;
  name?: string;
  score?: number;
  moy?: number;
  effectif?: number;
};

export default function CubeTeams(props: Team) {
  return (
    <Link href={`/dashboard/teachers/stats/teams/${props.uuid}`}>
      <div className="flex flex-col gap-5 p-4 py-3 w-64 h-64 bg-white rounded-xl border-2 border-dark-50 hover:border-accent-300 transition">
        <div className="flex bg-dark-50 rounded-md h-40 w-full"></div>
        <h3 className="font-semibold">Equipe : {props.name}</h3>
        <h2 className="text-accent-500 text-md font-bold">Voir les stats</h2>
      </div>
    </Link>
  );
}
