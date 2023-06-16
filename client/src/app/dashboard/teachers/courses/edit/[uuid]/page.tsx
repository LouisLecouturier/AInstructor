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
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const teams = [
  { name: "CSI3_2022_2023" },
  { name: "CIR3_2022_2023" },
  { name: "CNB3_2022_2023" },
];

const question = [
  {
    question:
      "Quels étaient les principaux événements et réalisations de Napoléon Bonaparte qui ont façonné son règne en tant qu'empereur des Français, et quel impact ont-ils eu sur l'Europe et le monde au cours du XIXe siècle ?",
  },
  { question: "Quoi ?" },
  { question: "Apagnant" },
  { question: "yeee" },
  { question: "Heyooo" },
];

const ManageCourse = (searchParams: { params: { uuid: string } }) => {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const { uuid } = searchParams.params;

  const { data: coursesData, isLoading: coursesLoading } = useQuery(
    ["courseData"],
    {
      queryFn: () => {
        return fetch(`http://localhost:8000/api/course/byId/${uuid}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => res.json());
      },
      enabled: !!accessToken,
    }
  );

  const handleUpdate = (e: HTMLFormElement) => {
    const formData = new FormData(e);
    const data = Object.fromEntries(formData.entries());
    setIsEditing(false);
  };

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
                  value={coursesData?.name}
                  isLoading={coursesLoading}
                  editable={isEditing}
                />
                <Information
                  label={"Description"}
                  name={"description"}
                  value={coursesData?.description}
                  isLoading={coursesLoading}
                  editable={isEditing}
                  isTextArea
                />
              </div>
              <div className={"flex flex-col gap-2 flex-1"}>
                <Information
                  label={"Subject"}
                  name={"subject"}
                  value={coursesData?.subject}
                  isLoading={coursesLoading}
                  editable={isEditing}
                />
                <Information
                  label={"File uploaded"}
                  name={"file"}
                  value={coursesData?.file.split("/").at(-1).replace(".md", "")}
                  isLoading={coursesLoading}
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
          <Button rounded={"full"}>
            Save access
          </Button>
        </Container>
        <QuestionsManager courseUuid={uuid} />
      </main>
    </div>
  );
};

export default ManageCourse;
