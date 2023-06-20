import React from "react";
import Link from "next/link";
import clsx from "clsx";

type Team = {
  uuid?: number;
  index?: number;
  name?: string;
  score?: number;
  moy?: number;
  effectif?: number;
  color?: string;
};

export default function CubeTeams(props: Team) {
  return (
    <Link href={`/dashboard/teachers/stats/teams/${props.uuid}`}>
      <div className="flex flex-col gap-5 p-4 py-3 w-52 h-52 bg-white rounded-xl border-2 border-dark-50 hover:border-accent-300 transition">
        <div className="flex-[2] flex justify-center items-center">
          <div style={{"backgroundColor" : props.color}} className={clsx(
            "flex rounded-md h-full aspect-square",
            !props.color && "bg-dark-50"
          )}/>
        </div>
        <div className="flex-1 flex-col flex gap-1">
          <h3 className="font-semibold">Equipe : {props.name}</h3>
          <h2 className="text-accent-500 text-md font-bold">Voir les stats</h2>
        </div>
      </div>
    </Link>
  );
}
