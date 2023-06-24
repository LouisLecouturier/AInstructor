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

  const { data: course, isLoading } = useQuery({
    queryKey: ["course"],
    queryFn: () => {
      console.log("fetching course");
      return getCourse(uuid, String(token));
    },
    enabled: ![params.uuid, token].includes(undefined),
  });

  if (isLoading) {
    return <div>loading</div>;
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
