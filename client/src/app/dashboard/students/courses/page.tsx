import React from "react";
import ListItem from "@components/layout/ListItem";
import Header from "@components/dashboard/Layout/Header";

type Course = {
  name: string;
  creationDate: string;
  deliveryDate: string;
  team: string;
  status: "pending" | "in-progress" | "done";
};

const courses: Course[] = [
  {
    name: "Homework 1",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "English - 4B",
    status: "pending",
  },
  {
    name: "Homework 2",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "English - 4B",
    status: "in-progress",
  },
  {
    name: "Homework 1",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "5g - French",
    status: "done",
  },
  {
    name: "Conjugation - Present perfect",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "Mathematics",
    status: "done",
  },
  {
    name: "Python - Function",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "English - 4B",
    status: "done",
  },
];

const MyCourses = () => {
  return (
    <div>
      <Header>My courses</Header>

      <main>
        <div className={"flex flex-col gap-2"}>
          {courses.map((course) => {
            const properties = [
              { label: "Creation date", value: course.creationDate },
              { label: "Delivery date", value: course.deliveryDate },
              { label: "Team", value: course.team },
            ];

            return (
              <ListItem
                href={"/dashboard/students/courses/1"}
                status={course.status}
                key={course.name}
                properties={properties}
              >
                {course.name}
              </ListItem>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MyCourses;
