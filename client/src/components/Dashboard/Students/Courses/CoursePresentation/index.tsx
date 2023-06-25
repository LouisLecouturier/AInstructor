"use client";

import React, { FC } from "react";
import ProgressBar from "@components/Dashboard/Common/Layout/ProgressBar";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import dayjs from "dayjs";
import Skeleton from "@components/Layout/Skeleton";

type CoursePresentationProps = {
  name: string;
  href: string;
  progress: number;
  creationDate: string;
  isLoading?: boolean;
  deadline: string;
};

const containerClassNames = clsx(
  "flex flex-col justify-between gap-4",
  "w-52  p-3",
  "border-2 border-dark-50 rounded-lg",
  "hover:border-accent-200",
  "cursor-pointer transition"
);

const CoursePresentation: FC<CoursePresentationProps> = (props) => {
  const router = useRouter();

  if (props.isLoading) {
    return (
      <article className={containerClassNames}>
        <Skeleton className={"w-24 h-8"} />
        <Skeleton className={"w-full h-32"} />
        <Skeleton className={"w-full h-4"} />
      </article>
    );
  }

  return (
    <article
      className={containerClassNames}
      onClick={() => router.push(props.href)}
    >
      <div className={"flex flex-col gap-4"}>
        <h1 className={"font-bold"}>{props.name}</h1>
        <div
          className={
            "flex flex-col gap-1 p-2 font-medium text-dark-300 bg-dark-10 rounded-sm"
          }
        >
          <div className={"flex flex-col text-sm"}>
            <label className={"font-semibold"}>Creation date:</label>
            <span className={"text-accent-500"}>
              {props.creationDate
                ? dayjs(props.creationDate).format("DD MMMM YYYY")
                : "No deadline"}
            </span>
          </div>
          <div className={"flex flex-col text-sm"}>
            <label className={"font-semibold"}>Deadline:</label>
            <span className={"text-accent-500"}>
              {props.deadline
                ? dayjs(props.deadline).format("DD MMMM YYYY")
                : "No deadline"}
            </span>
          </div>
        </div>
      </div>

      <div className={"flex gap-2 items-center"}>
        <span className={"text-sm font-semibold text-dark-300"}>
          {props.progress}%
        </span>
        <ProgressBar progress={props.progress} />
      </div>
    </article>
  );
};

export default CoursePresentation;
