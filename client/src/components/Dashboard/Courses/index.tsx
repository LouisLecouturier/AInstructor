import React from "react";
import ProgressBar from "@components/Dashboard/Common/Layout/ProgressBar";
import Link from "next/link";

type Course = {
  id?: number;
  index?: number;
  deliveryDate?: string;
  creationDate?: string;
  course?: string;
  progress?: number;
  isSeeAll?: boolean;
  href?: string;
  //   image: string;
};

function progessBar(props: Course) {
  const progress = props.progress;
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between gap-2">
        <div className="text-right">
          <span className="text-xl font-semibold inline-block text-green-600">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}

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
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-md">{props.course}</h3>
          <h3 className="font-semibold text-sm">Deadline : {props.deliveryDate}</h3>
          <h3 className="font-semibold text-sm">Created : {props.creationDate}</h3>

        </div>
        <div>
          <div className="flex gap-2 text-md">{progessBar(props)}</div>
          <ProgressBar progress={props.progress || 0} />
        </div>
      </div>
    </Link>
  );
}
