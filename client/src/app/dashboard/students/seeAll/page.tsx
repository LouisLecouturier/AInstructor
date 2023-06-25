"use client"
import Header from "@components/Dashboard/Common/Layout/Header";
import React from "react";
import QuestionCube from "@components/Dashboard/Courses";
import Container from "@components/Layout/Container";

const courses = [
  {
    date: "06/06",
    course: "ASN",
  },
  {
    date: "06/06",
    course: "Meca Q",
  },
  {
    date: "06/06",
    course: "Electronique",
  },
  {
    date: "06/06",
    course: "Physique",
  },
];

const progress = [
  {
    course: "ASN",
    progress: 10,
  },
  {
    course: "Meca Q",
    progress: 51,
  },
  {
    course: "Français",
    progress: 93,
  },
  {
    course: "Maths",
    progress: 68,
  },
  {
    course: "Physique",
    progress: 100,
  },
];

export default function seeAll() {
  return (
    <div className="flex flex-col gap-5">
      <Header
        className={"flex items-center h-16 text-4xl font-black"}
        title={"All my courses"}
      />
      <Container>
        <div className="flex flex-wrap gap-8">
          {courses.map((course, index) => (
            <QuestionCube
              key={course.course}
              index={index}
              course={course.course}
              progress={progress[index].progress}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
