import React from "react";
import ProgressBar from "@components/Dashboard/Layout/ProgressBar";
import Link from "next/link";

type Course = {
  id?: number;
  index?: number;
  date?: string;
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
  if (props.isSeeAll) {
    return (
      <Link
        href={"/dashboard/students/seeAll"}
        className="flex flex-col justify-center gap-1 p-4 py-3 flex-1 max-w-[16rem] h-80 bg-white rounded-xl hover:bg-accent-200 transition"
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
      className="flex flex-col p-4 flex-1 h-80 max-w-[16rem] bg-white rounded-xl hover:bg-accent-200 transition"
    >
      <div className="flex-1 flex justify-center items-center">
        <div className="flex bg-dark-50 rounded-md aspect-square w-3/4" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-semibold text-xl">{props.course}</h3>
          <h3 className="font-semibold">Date : {props.date}</h3>
        </div>
        <div>
          <div className="flex gap-2">{progessBar(props)}</div>
          <ProgressBar progress={props.progress || 0} />
        </div>
      </div>
    </Link>
  );
}