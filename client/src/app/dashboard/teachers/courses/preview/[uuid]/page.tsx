"use client";

import React, { useState } from "react";

import CourseHeader from "@components/Layout/Course/CourseHeader";
import ReactMarkdown from "react-markdown";

import { course } from "@assets/testData/course";
import Container from "@components/Layout/Container";
import { Button } from "@components/Layout/Interactions/Button";

import Stars from "@icons/Stars.svg";
import QuestionElement from "@components/Dashboard/Questions/Question";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "@requests/course";

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

const Questions = () => {
  const q = Array.from({ length: 4 }, (_, i) => i + 1);

  return (
    <div className={"flex flex-col gap-4"}>
      {q.map((_, i) => (
        <QuestionElement
          key={i}
          isLoading={i === 0}
          feedback={i === 1 ? undefined : i === 2 ? "correct" : "incorrect"}
          uuid={i + 1}
          questionNumber={i + 1}
          title={"Hey I'm a nice question"}
          description={"answer me and you'll get a good grade !"}
          type={"text"}
        />
      ))}
    </div>
  );
};

const Course = ({ params }: { params: { uuid: string } }) => {
  const [isTraining, setIsTraining] = useState(false);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const uuid = params.uuid;

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", params.uuid, "text"],
    queryFn: () => getCourse(uuid, String(token)),
    enabled: ![params.uuid, token].includes(undefined),
  });

  if (isLoading || isError) return <div>loading...</div>;


  return (
    <div>
      <CourseHeader
        title={course.name}
        teacher={course.teacher}
        subject={course.subject}
      />
      <main className={"flex flex-col gap-8"}>
        <Container className={"max-w-2xl"}>
          <div>
            <ReactMarkdown components={config}>{course.text}</ReactMarkdown>
          </div>
        </Container>

        <Container
          title={"Let's train together !"}
          description={"Learn your course using the AI coach"}
          className={"max-w-2xl"}
        >
          {isTraining ? (
            <Questions />
          ) : (
            <Button
              isMagic
              rounded={"full"}
              size={"sm"}
              onClick={() => setIsTraining(true)}
            >
              <Stars className={"w-5 h-5"} />
              <span>Generate questions</span>
            </Button>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Course;
