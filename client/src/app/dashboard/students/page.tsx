"use client";
import QuestionCube from "@components/Dashboard/Courses";

import React from "react";
import { useSession } from "next-auth/react";
import Header from "@components/Dashboard/Common/Layout/Header";
import ListItem from "@/components/Layout/ListItem";
import Container from "@components/Layout/Container";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import { getUserCoursesStats } from "@/requests/stats";

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
  const { data : session } = useSession();
  const firstname = session?.user.first_name;
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const { data : coursesStats, isLoading, isError } = useQuery<any[]>({
    queryKey: ["courses", id, "stats"],
    queryFn: () => getUserCoursesStats(String(id), String(token)),
    enabled: (token || id) !== undefined,
  });

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }

  console.log(coursesStats);


  return (
    <div className="flex flex-1 w-full flex-col">
      <Header title={"Dashboard"}/>
      <div className="flex-col flex gap-8">
        <h1 className="text-3xl font-bold">
          Welcome back to work {firstname} !
        </h1>

        <Container
          title="Continue my courses"
          description="Quickly access your current courses"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-8 ">
              {coursesStats.map((course, index) => {
                if (index < 3 && course.progress < 100) {
                  console.log(course);
                  return (
                    <>
                      <QuestionCube
                        key={nanoid()}
                        index={index}
                        course={course.course.name}
                        deliveryDate={course.course.deliveryDate}
                        creationDate={course.course.creationDate}
                        progress={course.progress}
                        href= {`/dashboard/students/courses/${course.course.uuid}`}
                        status={course.course.status}
                        // image={course.image}
                      />
                    </>
                  );
                }
              })}
              {coursesStats.length > 3 && (
                <QuestionCube isSeeAll />
              )}
              {(coursesStats.length === 0 || coursesStats.every(item => item.progress >= 100)) && (<span>Good news ! You don't have any work for the moment </span>)}

            </div>
          </div>
        </Container>

        <div className="flex flex-col gap-2">
          <Container title="Finished courses" description={"Access to your old courses"}>
            <div className="flex flex-col gap-2 w-full">
              {coursesStats.map((course: any) => {
                if (course.progress >= 100) {
                const properties = [
                  { label: "Creation date", value: course.course.creationDate },
                  { label: "Delivery date", value: course.course.deliveryDate },
                  { label: "Progress", value: course.progress + "%" },
                ];

                return (
                  <ListItem
                    href={"/dashboard/students/courses/1"}
                    key={nanoid()}
                    properties={properties}
                    status={course.course.status}
                  >
                    {course.course.name}
                  </ListItem>
                );
                }
              })}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;