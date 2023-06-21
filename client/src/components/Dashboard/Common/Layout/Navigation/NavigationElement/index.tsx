import React, { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

import styles from "./NavigationElement.module.scss";

import { usePathname } from "next/navigation";

type NavigationElementProps = {
  icon: React.ReactNode;
  label: string;
  link?: string;
  onClick?: () => void;
};

const NavigationElement: FC<NavigationElementProps> = (props) => {
  const active = String(usePathname()).split("/").slice(3).includes(props.label.toLowerCase());

  if (!props.link) {
    return (
      <div
        onClick={props.onClick}
        className={clsx(
          "flex gap-4 items-center",
          "p-2 text-lg",

          "rounded-lg",
          "hover:bg-accent-100/40 hover:text-accent-600",

          active && "bg-accent-100/50 text-accent-500",
          styles["container"],
          "transition cursor-pointer"
        )}
      >
        {props.icon}
        <span className={"font-semibold"}>{props.label}</span>
      </div>
    );
  }

  return (
    <Link
      href={props.link}
      className={clsx(
        "flex gap-4 items-center",
        "p-2 text-lg",

        "rounded-lg",
        "hover:bg-accent-100/30 hover:text-accent-600",
        active && "bg-accent-100/50 text-accent-500",
        styles["container"],
        "transition"
      )}
    >
      {props.icon}
      <span className={"font-semibold"}>{props.label}</span>
    </Link>
  );
};

export default NavigationElement;
