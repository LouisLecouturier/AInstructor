import React from "react";
import ProgressBar from "@components/Dashboard/Common/Layout/ProgressBar";
import Link from "next/link";

import Check from "@icons/Checkmark.svg";
import Pending from "@icons/Pending.svg";
import Late from "@icons/Close.svg";

type Course = {
  id?: number;
  index?: number;
  deliveryDate?: string;
  creationDate?: string;
  course?: string;
  progress?: number;
  isSeeAll?: boolean;
  href?: string;
  status?: "finished" | "pending" | "late";
  //   image: string;
};

const statusIcon = (status?: "finished" | "pending" | "late") => {
  switch (status) {
    case "finished":
      return <Check className={"w-6 h-6 text-green-500"} />;
    case "pending":
      return <Pending className={"w-6 h-6 text-primary-500"} />;
    case "late":
      return <Late className={"w-6 h-6 text-secondary-500"} />;
  }
};

export default function QuestionCube(props: Course) {
  if (props.isSeeAll || !props.href) {
    return (
      <Link
        href={"/dashboard/students/seeAl"}
        className="flex flex-col justify-center gap-1 p-4 py-3 max-w-[20%] w-full  h-40 bg-white rounded-xl border-2 border-dark-50 hover:border-accent-200 transition"
      >
        <div className="text-accent-500 text-xl font-bold text-center">...</div>
        <h3 className="text-accent-500 text-xl font-bold text-center">
          See all
        </h3>
      </Link>
    );
  }

  return (
    <Link
      href={props.href || "/dashboard/students"}
      className="flex flex-col p-4 h-40 max-w-[20%] w-full bg-white rounded-xl border-2 border-dark-50 hover:border-accent-200 transition"
    >
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            {props.status && statusIcon(props.status)}
            <h3 className="font-semibold text-md">{props.course}</h3>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">
              Deadline : {props.deliveryDate}
            </h3>
            <h3 className="font-semibold text-sm">
              Creation date : {props.creationDate}
            </h3>
          </div>
        </div>

        <ProgressBar progress={props.progress || 0} />
      </div>
    </Link>
  );
}
