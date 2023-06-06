import React, { FC } from "react";
import clsx from "clsx";

type CourseHeaderProps = {
  title: string;
  teacher: string;
  className?: string;
};

const CourseHeader: FC<CourseHeaderProps> = (props) => {
  return (
    <header className={clsx("flex flex-col gap-2 mb-16", props.className)}>
      <h1 className={"text-4xl font-black text-secondary-500"}>{props.title}</h1>
      <span>De : {props.teacher}</span>
    </header>
  );
};

export default CourseHeader;
