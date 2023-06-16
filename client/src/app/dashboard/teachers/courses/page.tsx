"use client";

import React from "react";

import Header from "@components/dashboard/Layout/Header";
import ListItem from "@components/layout/ListItem";
import SectionTitle from "@components/dashboard/Layout/SectionTitle";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
=======
import Container from "@components/layout/Container";
import { Button } from "@components/Interactions/Button";
import { nanoid } from "nanoid";
import { Course } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCourses } from "@/requests/courses";
>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d


const courses = [
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
] as Course[];

const Courses = () => {
  const pastCourses = courses.filter((course) => course.status === "done");
  const router = useRouter();
  
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;


  const goTo = (path: string) => {
    router.push(path);
  };


  const { data, isLoading, isError } = useQuery<Course[]>({
    queryKey: ["teams"],
    queryFn: () => getCourses(String(token), String(id) ),
    enabled: (token && id )!== undefined,
  });

  if (isLoading || isError) {
    return <div>loading...</div>;
  }


  return (
    <div>
      <Header>Courses</Header>
      <main className={"flex flex-col gap-8"}>
<<<<<<< HEAD
        <section>
          <SectionTitle>Incoming courses</SectionTitle>
=======
        <Container title={"Create a new course"}>
          <div className={"flex flex-col gap-1"}>
            <Button
              rounded={"full"}
              size={"sm"}
              onClick={() => goTo("/dashboard/teachers/courses/create")}
            >
              Create a new course
            </Button>
          </div>
        </Container>

        <Container title={"Your courses"} description={"Preview, manage, delete your courses"}>
>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d
          <div className={"flex flex-col gap-2"}>
            {data.map((course, index) => {
              const properties = [
                { label: "Creation date", value: course.creationDate },
                { label: "Delivery date", value: course.deliveryDate },
                { label: "Team", value: course.team },
              ];

              return (
                <ListItem
                  key={course.name}
                  properties={properties}
                  withUserActions
                  onSee={() =>
                    goTo(`/dashboard/teachers/courses/preview/${course.uuid}`)
                  }
                  onEdit={() =>
                    goTo(`/dashboard/teachers/courses/edit/${course.uuid}`)
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
                  key={course.name}
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
