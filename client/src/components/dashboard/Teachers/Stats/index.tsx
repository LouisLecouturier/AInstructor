import React from "react";
import Link from "next/link";
import clsx from "clsx";
import Skeleton from "@components/Layout/Skeleton";

type CubeTeamsProps = {
  uuid?: number;
  index?: number;
  name?: string;
  isLoading?: boolean;
  score?: number;
  moy?: number;
  effectif?: number;
  color?: string;
  href: string;
};

const containerClassNames = clsx(
  "flex flex-col gap-4 justify-between",
  "w-48 h-48 p-4",
  "bg-white",
  "rounded-xl border-2 border-dark-50 ",
  "transition"
);

export default function CubeTeams(props: CubeTeamsProps) {
  if (props.isLoading) {
    return (
      <article className={containerClassNames}>
        <div className="flex justify-center items-center">
          <Skeleton className="w-24 h-24 rounded-md" />
        </div>
        <div className="flex-col flex gap-2">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-12 h-4" />
        </div>
      </article>
    );
  }

  return (
    <Link
      href={props.href}
      className={clsx(containerClassNames, "hover:border-accent-200")}
    >
      <div className="flex justify-center items-center">
        <div
          style={{ backgroundColor: props.color }}
          className={clsx(
            "w-24 h-24",
            "rounded-md",
            !props.color && "bg-dark-50"
          )}
        />
      </div>
      <div className="flex-col flex gap-2">
        <h3 className="font-semibold text-lg leading-none">{props.name}</h3>
        <span className="text-accent-500 text-sm font-bold leading-none">
          View stats
        </span>
      </div>
    </Link>
  );
}
