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
};

export default function CubeTeams(props: Team) {
  return (
    <Link
      href={`/dashboard/teachers/stats/teams/${props.uuid}`}
      className={clsx(
        "flex flex-col gap-4",
        "w-56 h-56 p-4",
        "bg-white",
        "rounded-xl border-2 border-dark-50",
        "hover:border-accent-200",
        "transition"
      )}
    >
      <div className="bg-dark-50 rounded-md w-full aspect-square"></div>
      <h3 className="font-semibold">{props.name}</h3>
      <h2 className="text-accent-500 text-md font-bold">See stats</h2>
    </Link>
  );
}
