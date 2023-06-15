"use client";

import React, { useRef, useState } from "react";
import Container from "@components/layout/Container";
import Header from "@components/dashboard/Layout/Header";
import Information from "@components/layout/Information";
import { Button } from "@components/Interactions/Button";

import EditIcon from "@icons/Edit.svg";
import CheckIcon from "@icons/Checkmark.svg";
import Table from "@components/dashboard/Table";
import QuestionsManager from "@components/dashboard/Teachers/QuestionsManager";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const courseQuery = async (uuid: string, accessToken?: string) => {
  if (!accessToken) return null;

  const res = await fetch("http://127.0.0.1:8000/api/course/byId/" + uuid, {
    method: "GET",
    headers: {
      authorization: "Bearer " + accessToken,
    },
  });

  const data = await res.json();
  return data;
};

const getCourseQuestions = async (uuid: string, accessToken?: string) => {
  if (!accessToken) return null;

  const res = await fetch(
    "http://127.0.0.1:8000/api/quizz/by-course/" + uuid + "/questions",
    {
      method: "GET",
      headers: {
        authorization: "Bearer " + accessToken,
      },
    }
  );

  const data = await res.json();
  return data;
};

const ManageCourse = ({ params }: { params: { uuid: string } }) => {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;
  const [isEditing, setIsEditing] = useState(false);

  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryKey: ["course", accessToken],
    queryFn: () => courseQuery(params.uuid, session?.user.accessToken),
    enabled: ![params.uuid, accessToken].includes(undefined),
  });

  const { data: courseQuestions, isLoading: questionsLoading } = useQuery({
    queryKey: ["courseQuestions", accessToken],
    queryFn: () => getCourseQuestions(params.uuid, session?.user.accessToken),
    enabled: ![params.uuid, accessToken].includes(undefined),
  });


  const [questions, setQuestions] = useState([]);

  const formRef = useRef<HTMLFormElement>(null);

  const teams = [
    { name: "CSI3_2022_2023" },
    { name: "CIR3_2022_2023" },
    { name: "CNB3_2022_2023" },
  ];

  const handleUpdate = (e: HTMLFormElement) => {
    const formData = new FormData(e);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setIsEditing(false);
  };

  if (courseLoading || questionsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header>Manage course</Header>
      <main className={"flex flex-col gap-8"}>
        <Container
          title={"Course informations"}
          description={"Manage your course"}
          action={
            <Button
              size={"sm"}
              onClick={() => {
                if (isEditing && formRef.current) {
                  handleUpdate(formRef.current);
                  return;
                }
                setIsEditing(true);
              }}
            >
              {isEditing ? (
                <>
                  <CheckIcon className={"w-4 h-4"} />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <EditIcon className={"w-4 h-4"} />
                  <span>Edit</span>
                </>
              )}
            </Button>
          }
        >
          <form ref={formRef} className={"flex flex-col gap-4"}>
            <div className={"flex gap-4"}>
              <div className={"flex flex-col gap-2 flex-1"}>
                <Information
                  label={"Name"}
                  name={"name"}
                  value={"La transformée de Fourier"}
                  editable={isEditing}
                />
                <Information
                  label={"Description"}
                  name={"description"}
                  value={
                    "Cours d'introduction à la transformée de Fourier continue"
                  }
                  editable={isEditing}
                  isTextArea
                />
              </div>
              <div className={"flex flex-col gap-2 flex-1"}>
                <Information
                  label={"Subject"}
                  name={"subject"}
                  value={"Mathématiques"}
                  editable={isEditing}
                />
                <Information
                  label={"File uploaded"}
                  name={"file"}
                  value={"transfo_four_CSI3.docx"}
                  editable={isEditing}
                />
              </div>
            </div>
          </form>
        </Container>
        <Container
          title={"Manage team access"}
          description={"Assign this course to your teams"}
        >
          <Table
            columns={[{ key: "name", label: "Name" }]}
            data={teams}
            ordered
          />
          <Button size={"sm"} rounded={"full"}>
            Save access
          </Button>
        </Container>
        <QuestionsManager questions={questions} setQuestions={setQuestions} />
      </main>
    </div>
  );
};

export default ManageCourse;
