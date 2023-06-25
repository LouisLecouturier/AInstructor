import React from "react";

type Progress = {
  progress: number;
};

export default function ProgressBar(props: Progress) {
  return (
    <div className="flex w-full h-1.5 bg-dark-50 rounded-full">
      <div
        className="flex bg-accent-500 h-full rounded-full"
        style={{ width: `${props.progress}%` }}
      ></div>
    </div>
  );
}
