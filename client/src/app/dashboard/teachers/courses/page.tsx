"use client";

import React from "react";

import Header from "@components/dashboard/Layout/Header";
import ListItem from "@components/layout/ListItem";
import SectionTitle from "@components/dashboard/Layout/SectionTitle";
import { useRouter } from "next/navigation";
import Container from "@components/layout/Container";
import { Button } from "@components/Interactions/Button";
import { nanoid } from "nanoid";

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

const Courses = () => {
  const pastCourses = courses.filter((course) => course.status === "done");
  const router = useRouter();

  const goTo = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <Header>Courses</Header>
      <main className={"flex flex-col gap-8"}>
        <Container title={"Create a new course"}>
          <div className={"flex flex-col gap-1"}>
            <Button
              rounded={"full"}
              onClick={() => goTo("/dashboard/teachers/courses/create")}
            >
              Create
            </Button>
          </div>
        </Container>
        <section>
          <SectionTitle>Incoming courses</SectionTitle>
          <div className={"flex flex-col gap-2"}>
            {courses.map((course, index) => {
              const properties = [
                { label: "Creation date", value: course.creationDate },
                { label: "Delivery date", value: course.deliveryDate },
                { label: "Team", value: course.team },
              ];

              return (
                <ListItem
                  key={nanoid()}
                  properties={properties}
                  withUserActions
                  onSee={() =>
                    goTo(`/dashboard/teachers/courses/preview/${index}`)
                  }
                  onEdit={() =>
                    goTo(`/dashboard/teachers/courses/edit/${index}`)
                  }
                >
                  {course.name}
                </ListItem>
              );
            })}
          </div>
        </section>
        <section>
          <SectionTitle>Passed courses</SectionTitle>
          <div className={"flex flex-col gap-2"}>
            {courses.map((course, index) => {
              const properties = [
                { label: "Creation date", value: course.creationDate },
                { label: "Delivery date", value: course.deliveryDate },
                { label: "Team", value: course.team },
              ];

              return (
                <ListItem
                  key={nanoid()}
                  properties={properties}
                  withUserActions
                  onSee={() =>
                    goTo(`/dashboard/teachers/courses/preview/${index}`)
                  }
                  onEdit={() =>
                    goTo(`/dashboard/teachers/courses/edit/${index}`)
                  }
                >
                  {course.name}
                </ListItem>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Courses;
