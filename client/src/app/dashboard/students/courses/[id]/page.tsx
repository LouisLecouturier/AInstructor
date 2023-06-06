import React from "react";
import Header from "@components/dashboard/Layout/Header";
import clsx from "clsx";
import CourseHeader from "@components/layout/Course/CourseHeader";

const Course = () => {
  return (
    <div>
      <CourseHeader title={"La guerre Froide"} teacher={"Pascal Ricq"} />
    </div>
  );
};

export default Course;
