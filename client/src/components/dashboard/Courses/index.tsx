import React from "react";
import ProgressBar from "@components/dashboard/Layout/ProgressBar";

type Course = {
  index: number;
  date: string;
  course: string;
  progress: number;
  //   image: string;
};

function progessBar(props: Course) {
  const progress = props.progress;
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between gap-2">
        <div>
          {/* <span className="text-md font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
            {props.course}
          </span> */}
        </div>
        <div className="text-right">
          <span className="text-xl font-semibold inline-block text-green-600">
            {progress}%
          </span>
        </div>
      </div>
      {/* <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
        <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
      </div> */}
    </div>
  );
}

export default function QuestionCube(props: Course) {
  return (
    <>
      <div className="flex flex-col gap-1 p-4 py-3 w-64 h-64 bg-white rounded-xl">
        <div className="flex bg-dark-50 rounded-md h-full w-full"></div>
        <h3 className="font-semibold">Cours : {props.course}</h3>
        <h3 className="font-semibold">Date : {props.date}</h3>
        <div className="flex gap-2">{progessBar(props)}</div>
        <ProgressBar progress={props.progress} />
      </div>
    </>
  );
}
