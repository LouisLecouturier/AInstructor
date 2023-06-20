import React, { FC } from "react";
import clsx from "clsx";

type CourseHeaderProps = {
  title: string;
  teacher: string;
  subject: string;
  className?: string;
};

const CourseHeader: FC<CourseHeaderProps> = (props) => {
  return (
    <header className={clsx("flex flex-col gap-2 mb-16", props.className)}>
      <h1 className={"text-4xl font-black"}>{props.title}</h1>
      <span className={"text-lg font-semibold text-dark-300"}>Subject : {props.subject}</span>
      <span className={"text-lg italic font-semibold text-dark-300"}>From : {props.teacher}</span>
    </header>
  );
};

export default CourseHeader;
