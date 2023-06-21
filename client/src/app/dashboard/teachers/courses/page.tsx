"use client";

import React from "react";

import Header from "@components/Dashboard/Common/Layout/Header";
import ListItem from "@components/Layout/ListItem";
import { useRouter } from "next/navigation";
import Container from "@components/Layout/Container";
import { Button } from "@components/Layout/Interactions/Button";
import { nanoid } from "nanoid";
import { Course } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { deleteCourse, getCourses } from "@requests/course";
import clsx from "clsx";
import Link from "next/link";

const Courses = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const goTo = (path: string) => {
    router.push(path);
  };

  const { data, isLoading, isError } = useQuery<Course[]>(["courses"], {
    queryFn: async () => {
      const yee = await getCourses(String(token), String(id));
      console.log(yee);
      return yee;
    },
    enabled: ![token, id].includes(undefined),
  });

  const handleDelete = async (uuid: string) => {
    if (token) {
      deleteCourse(uuid, token);
      // location.reload();
    }
  };

  return (
    <div>
      <Header title={"Courses"} />
      <main className={"flex flex-col gap-8"}>
        <Container title={"New course"} description={"Create a new course"}>
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

        <Container
          title={"Your courses"}
          description={"Preview, manage, delete your courses"}
        >
          <div className={"flex flex-col gap-2"}>
            {isLoading || isError ? (
              Array.from({ length: 2 }).map(() => (
                <ListItem properties={[]} key={nanoid()} isLoading />
              ))
            ) : data.length > 0 ? (
              data.map((course) => {
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
                      goTo(`/dashboard/teachers/courses/preview/${course.uuid}`)
                    }
                    onEdit={() =>
                      goTo(`/dashboard/teachers/courses/edit/${course.uuid}`)
                    }
                    onDelete={() => handleDelete(course.uuid)}
                    onClick={() =>
                      goTo(`/dashboard/teachers/courses/edit/${course.uuid}`)
                    }
                  >
                    {course.name}
                  </ListItem>
                );
              })
            ) : (
              <div
                className={clsx(
                  "flex flex-col gap-2",
                  "py-8",
                  "text-sm font-bold text-center text-dark-200 bg-dark-10 rounded-md"
                )}
              >
                <span>You don&apos;t have any course</span>
                <Link
                  className={"text-accent-500 underline"}
                  href={"/dashboard/teachers/courses/create"}
                >
                  Create one
                </Link>
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Courses;
