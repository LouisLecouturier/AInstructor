import React from "react";

type Progress = {
  progress: number;
};

export default function ProgressBar(props: Progress) {
  return (
    <>
      <div className="flex w-full h-2 bg-dark-50 rounded-xl">
        <div
          className="flex bg-accent-500 h-full rounded-xl"
          style={{ width: `${props.progress}%` }}
        ></div>
      </div>
    </>
  );
}
