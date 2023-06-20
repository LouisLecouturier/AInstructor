"use client";
import QuestionCube from "@components/dashboard/Courses";

import React from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/dashboard/Layout/Header";
import ListItem from "@/components/layout/ListItem";
import Container from "@/components/layout/Container";

const courses = [
  {
    date: "06/06",
    course: "ASN",
  },
  {
    date: "06/06",
    course: "Meca Q",
  },
];

const homeworks = [
  {
    creationDate: "06/06/2023",
    deliveryDate: "06/06/2023",
    course: "Electronique",
  },
  {
    creationDate: "06/06/2023",
    deliveryDate: "06/06/2023",
    course: "Physique",
  },
  {
    creationDate: "06/06/2023",
    deliveryDate: "06/06/2023",
    course: "Maths",
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

const Dashboard = () => {
  const { data } = useSession();
  const firstname = data?.user.first_name;

  return (
    <div className="flex flex-1 w-full flex-col">
      <Header title={"Dashboard"}/>
      <div className="flex-col flex gap-8">
        <h1 className="text-4xl font-bold">
          Bon retour parmi nous {firstname} !
        </h1>

        <Container title="Reprendre mon parcours">
          <div className="flex gap-8">
            {courses.map((course, index) => (
              <QuestionCube
                key={course.course}
                index={index}
                course={course.course}
                date={course.date}
                progress={progress[index].progress}
                // image={course.image}
              />
            ))}

            <QuestionCube isSeeAll />
        </div>
        </Container>

        <div className="flex flex-col gap-2">
          <Container title="Mes formations" description={"Access your courses"}>
            <div className="flex flex-col gap-2 w-full">
              {homeworks.map((homework: any) => {
                const properties = [
                  { label: "Creation date", value: homework.creationDate },
                  { label: "Delivery date", value: homework.deliveryDate },
                ];

                return (
                  <ListItem
                    href={"/dashboard/students/courses/1"}
                    key={homework.name}
                    properties={properties}
                  >
                    {homework.course}
                  </ListItem>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;