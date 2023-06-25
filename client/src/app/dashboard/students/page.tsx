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
import ContainerMessage from "@components/Layout/Container/ContainerMessage";
import CoursePresentation from "@components/Dashboard/Students/Courses/CoursePresentation";

const Dashboard = () => {
  const { data: session } = useSession();
  const firstname = session?.user.first_name;
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const {
    data: coursesStats,
    isLoading,
    isError,
  } = useQuery<any[]>({
    queryKey: ["courses", id, "stats"],
    queryFn: () => getUserCoursesStats(String(id), String(token)),
    enabled: (token || id) !== undefined,
  });

  if (isError) {
    return (
      <>
        <Header title={"Dashboard"} />
        <div className="flex-col flex gap-8">
          <h1 className="text-3xl font-bold">
            Welcome back to work {firstname} !
          </h1>

          <Container
            title="Continue my courses"
            description="Quickly access your current courses"
          >
            <ContainerMessage>
              An error occurred while fetching your courses.
            </ContainerMessage>
          </Container>

          <Container
            title="Finished courses"
            description={"Access to your old courses"}
          >
            <ContainerMessage>
              An error occurred while fetching your courses.
            </ContainerMessage>
          </Container>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header title={"Dashboard"} />
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
                {Array.from({ length: 3 }).map((_, index) => (
                  <CoursePresentation
                    key={nanoid()}
                    name={""}
                    deadline={""}
                    isLoading
                    creationDate={""}
                    progress={0}
                    href={""}
                    // image={course.image}
                  />
                ))}
              </div>
            </div>
          </Container>

          <Container
            title="Finished courses"
            description={"Access to your old courses"}
          >
            <div className="flex flex-col gap-2 w-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <ListItem
                  href={"/dashboard/students/courses/1"}
                  key={nanoid()}
                  properties={[]}
                  isLoading
                  status={"finished"}
                />
              ))}
            </div>
          </Container>
        </div>
      </>
    );
  }

  const finishedCourses = coursesStats.filter((c) => c.progress === 100);

  return (
    <>
      <Header title={"Dashboard"} />
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
              {coursesStats
                .filter((c) => c.progress < 100)
                .slice(0, 2)
                .map((course, index) => (
                  <CoursePresentation
                    key={nanoid()}
                    name={course.course.name}
                    deadline={course.course.deliveryDate}
                    creationDate={course.course.creationDate}
                    progress={course.progress}
                    href={`/dashboard/students/courses/${course.course.uuid}`}
                    // image={course.image}
                  />
                ))}
              {coursesStats.length > 3 && <QuestionCube isSeeAll />}
              {(coursesStats.length === 0 ||
                coursesStats.every((item) => item.progress >= 100)) && (
                <span>
                  Good news ! You don&apos;t have any work to do at the moment
                  😉
                </span>
              )}
            </div>
          </div>
        </Container>

        <Container
          title="Finished courses"
          description={"Access to your old courses"}
        >
          <div className="flex flex-col gap-2 w-full">
            {finishedCourses.length > 0 ? (
              finishedCourses.map((course: any) => {
                const properties = [
                  {
                    label: "Creation date",
                    value: course.course.creationDate,
                  },
                  {
                    label: "Delivery date",
                    value: course.course.deliveryDate,
                  },
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
              })
            ) : (
              <ContainerMessage>
                You haven&apos;t finished any course yet
              </ContainerMessage>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
