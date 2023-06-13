import React from "react";
import ProgressBar from "@components/dashboard/Layout/ProgressBar";

type Course = {
  id?: number;
  index?: number;
  date?: string;
  course?: string;
  progress?: number;
  isSeeAll?: boolean;
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
      <div className="flex flex-col justify-center gap-1 p-4 py-3 w-64 h-64 bg-white rounded-xl hover:bg-accent-200 transition">
        <div className="text-accent-500 text-xl font-bold text-center">...</div>
        <h3 className="text-accent-500 text-xl font-bold text-center">
          See all
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 p-4 py-3 w-64 h-64 bg-white rounded-xl hover:bg-accent-200 transition">
      <div className="flex bg-dark-50 rounded-md h-full w-full"></div>
      <h3 className="font-semibold">Cours : {props.course}</h3>
      <h3 className="font-semibold">Date : {props.date}</h3>
      <div className="flex gap-2">{progessBar(props)}</div>
      <ProgressBar progress={props.progress || 0} />
    </div>
  );
}
