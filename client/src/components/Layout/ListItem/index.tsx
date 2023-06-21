"use client";

import React, { FC } from "react";

import Edit from "@icons/Edit.svg";
import Show from "@icons/Show.svg";
import Delete from "@icons/Delete.svg";

import Check from "@icons/Checkmark.svg";
import Pending from "@icons/Pending.svg";
import InProgress from "@icons/Pencil.svg";

import clsx from "clsx";
import styles from "./ListItem.module.scss";
import { useRouter } from "next/navigation";
import Skeleton from "@components/Layout/Skeleton";

type Property = {
  label: string;
  value: string;
};

type ListItemProps = {
  children?: React.ReactNode;
  properties: Property[];
  status?: "done" | "pending" | "in-progress";
  href?: string;
  withUserActions?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onSee?: () => void;
};

const statusIcon = (status?: "done" | "pending" | "in-progress") => {
  switch (status) {
    case "done":
      return <Check className={"w-6 h-6 text-green-500"} />;
    case "pending":
      return <Pending className={"w-6 h-6 text-primary-500"} />;
    case "in-progress":
      return <InProgress className={"w-6 h-6 text-accent-500"} />;
  }
};

const ListItem: FC<ListItemProps> = (props) => {
  const router = useRouter();

  if (props.isLoading) {
    return (
      <article
        className={clsx(
          "group",
          "border-2 border-dark-50",
          "flex flex-col gap-4",
          "p-4 py-3 w-full bg-white rounded-xl",
          "cursor-pointer"
        )}
      >
        <header>
          <Skeleton className={"w-1/3 h-6"} />
        </header>
        <div className={"flex flex-col gap-1"}>
          <Skeleton className={"w-1/2 h-4"} rounded={"sm"}/>
          <Skeleton className={"w-1/2 h-4"} rounded={"sm"}/>
        </div>
      </article>
    );
  }

  return (
    <article
      className={clsx(
        "group",
        "border-2 border-dark-50 hover:border-accent-200 transition",
        "flex flex-col gap-1",
        "p-4 py-3 w-full bg-white rounded-xl",
        "cursor-pointer"
      )}
      onClick={() => {
        props.href && router.push(props.href);
      }}
    >
      <header className={"flex justify-between w-full"}>
        <div
          className={"flex items-center flex-1 gap-2"}
          onClick={props.onClick}
        >
          {props.status && statusIcon(props.status)}
          <span
            className={clsx(
              "font-black text-dark-500 group-hover:text-accent-500 transition"
            )}
          >
            {props.children}
          </span>
        </div>
        {props.withUserActions && (
          <div
            className={clsx(
              "flex gap-2 justify-self-end",
              styles["interactions"]
            )}
          >
            <Show onClick={props.onSee} />
            <Edit onClick={props.onEdit} />
            <Delete onClick={props.onDelete} />
          </div>
        )}
      </header>
      <div className={"flex items-center gap-8 flex-1"}>
        <div className="flex gap-2">
          {props.properties.map((property) => {
            return (
              <div key={property.label} className="flex items-center gap-2">
                <span className="text-dark-300 text-sm font-semibold">
                  {property.label} :
                </span>
                <span className="text-dark-200 text-xs font-semibold">
                  {property.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default ListItem;
