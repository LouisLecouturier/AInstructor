import React, { FC } from "react";
import Icon from "@icons/Plus.svg";
import clsx from "clsx";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Team } from "@/types/team";

type TeamCardProps = {
  team?: Team;
  isAddCard?: boolean;
  className?: string;
};

export const TeamCard: FC<TeamCardProps> = (props) => {
  const { data: session } = useSession();

  const containerClassNames = clsx(
    "flex flex-col gap-6 items-center justify-center",
    "w-56 h-56 p-4 bg-white rounded-lg",
    "hover:scale-105",
    "cursor-pointer",
    "transition",
    props.className
  );

  const role = session?.user.isTeacher ? "teachers" : "students";
  const direction = props.isAddCard && session?.user.isTeacher ? "create" : "overview";
  const href = "/dashboard/" + role + "/teams/" + direction + "/";

  if (!props.team)
    return (
      <Link
        className={containerClassNames}
        href={"/dashboard/teachers/teams/create"}
      >
        <Icon className="w-1/2 h-1/2" />
      </Link>
    );

  return (
    <Link
      className={containerClassNames}
      href={{
        pathname: href,
        query: { id: props.team.uuid },
      }}
    >
      <div
        style={{ backgroundColor: props.team.color }}
        className="w-28 h-28 rounded-lg"
      />
      <span className="text-lg text-center font-bold text-dark-500">
        {props.team.name}
      </span>
    </Link>
  );
};

export default TeamCard;
