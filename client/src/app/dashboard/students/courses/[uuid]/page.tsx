"use client";

import React from "react";

import CourseHeader from "@components/Layout/Course/CourseHeader";
import ReactMarkdown from "react-markdown";

import { course } from "@/assets/testData/course";
import Container from "@components/Layout/Container";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "@requests/course";
import TrainingSection from "@components/Dashboard/Students/TrainingSection";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";
import Skeleton from "@components/Layout/Skeleton";

const config = {
  h1: ({ ...props }) => (
    <h2 className={"text-3xl font-black mt-6 first:mt-0 mb-2"} {...props} />
  ),
  h2: ({ ...props }) => (
    <h2
      className={"text-2xl text-accent-500 font-black mt-6 first:mt-0 mb-2"}
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className={"text-xl text-accent-400 font-bold mt-6 first:mt-0 mb-2"}
      {...props}
    />
  ),
  h4: ({ ...props }) => (
    <h4 className={"text-lg font-semibold mt-6 mb-2"} {...props} />
  ),
  p: ({ ...props }) => (
    <p className={"font-medium text-dark-300 text-justify mb-2"} {...props} />
  ),
};

const Course = ({ params }: { params: { uuid: string } }) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const uuid = params.uuid;

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course"],
    queryFn: () => getCourse(uuid, String(token)),
    enabled: ![params.uuid, token].includes(undefined),
  });

  if (isError) {
    return (
      <Container title={"Oops..."} description={"Something went wrong"}>
        <ContainerMessage>
          An error occurred while loading this course
        </ContainerMessage>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <header className={"flex flex-col gap-4"}>
          <Skeleton className={"h-16 w-1/2"} />
          <Skeleton className={"h-8 w-1/3"} />
          <Skeleton className={"h-8 w-1/4"} />
        </header>

        <div className={"flex flex-col gap-8 max-w-2xl"}>
          <div className={"flex flex-col gap-4"}>
            <Skeleton className={"h-6 w-2/3"} />
            <Skeleton className={"h-4 w-3/4"} />
            <Skeleton className={"h-4 w-3/4"} />
            <Skeleton className={"h-4 w-1/2"} />
          </div>
          <div className={"flex flex-col gap-4"}>
            <Skeleton className={"h-6 w-full"} />
            <Skeleton className={"h-4 w-3/4"} />
            <Skeleton className={"h-4 w-3/4"} />
            <Skeleton className={"h-4 w-1/2"} />
          </div>
          <div className={"flex flex-col gap-4"}>
            <Skeleton className={"h-6 w-1/2"} />
            <Skeleton className={"h-4 w-3/4"} />
            <Skeleton className={"h-4 w-3/4"} />
            <Skeleton className={"h-4 w-1/2"} />
          </div>
          <div className={"flex flex-col gap-4"}>
            <Skeleton className={"h-6 w-2/3"} />
            <Skeleton className={"h-4 w-3/4"} />
            <Skeleton className={"h-4 w-3/4"} />
            <Skeleton className={"h-4 w-1/2"} />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <main className={"flex flex-col gap-8"}>
      <Container>
        <CourseHeader
          title={course.name}
          subject={course.subject}
          teacher={course.teacher}
        />
        {course && (
          <div className={"max-w-2xl"}>
            <ReactMarkdown components={config}>{course.text}</ReactMarkdown>
          </div>
        )}
      </Container>
      <TrainingSection quizzUuid={course.quizz} accessToken={token!} />
    </main>
  );
};

export default Course;
