"use client";
import React from "react";

import { useSession } from "next-auth/react";
import TeamMainInformation from "@components/Dashboard/Teams/MainInformation";
import { useRouter } from "next/navigation";
import Container from "@components/Layout/Container";
import Table from "@components/Dashboard/Common/Layout/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Team } from "@/types/team";
import {
  addUsers,
  deleteTeam,
  fetchTeam,
  getCoursesTeam,
  removeUsers,
  updateTeam,
} from "@requests/team";
import Header from "@components/Dashboard/Common/Layout/Header";
import ListItem from "@components/Layout/ListItem";
import { Course } from "@/types/course";
import { nanoid } from "nanoid";

export default function TeamOverview({ params }: { params: { uuid: string } }) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const router = useRouter();

  const queryClient = useQueryClient();

  const uuid = params.uuid;

  console.log(uuid);

  const { data, isLoading, isError } = useQuery<Team>({
    queryKey: ["team", uuid],
    queryFn: () => fetchTeam(String(token), uuid),
    enabled: ![token, uuid].includes(undefined),
  });

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery<Course[]>(["team", uuid, "courses"], {
    queryFn: () => getCoursesTeam(String(uuid), String(token)),
    enabled: ![token, uuid].includes(undefined),
  });

  const mutation = useMutation({
    mutationFn: () => deleteTeam(uuid, String(token)),
    onSuccess: () => {
      router.push("/dashboard/teachers/teams");
      queryClient.invalidateQueries(["teams"]);
    },
  });

  const mutationAddUsers = useMutation({
    mutationFn: (emails: string[]) => addUsers(uuid, emails, String(token)),
    onSuccess: () => {
      queryClient.invalidateQueries(["team", uuid]);
    },
  });

  const mutationRemoveUsers = useMutation({
    mutationFn: (emails: string[]) => removeUsers(uuid, emails, String(token)),
    onSuccess: () => {
      queryClient.invalidateQueries(["team", uuid]);
    },
  });

  const mutationUpdateTeam = useMutation({
    mutationFn: (team: Omit<Team, "users" | "uuid">) =>
      updateTeam(uuid, team, String(token)),
    onSuccess: () => {
      queryClient.invalidateQueries(["team", uuid]);
    },
  });

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    if (data) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const team: Team = {
        users: data.users,
        uuid: Number(uuid),
        name:
          String(formData.get("name")) == ""
            ? data.name
            : String(formData.get("name")),
        description:
          String(formData.get("description")) == ""
            ? data.description
            : String(formData.get("description")),
        color:
          String(formData.get("color")) == ""
            ? data.color
            : String(formData.get("color")),
      };

      mutationUpdateTeam.mutate(team);
    }
  };

  const handleSubmitAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    mutationAddUsers.mutate([email]);
  };

  const getEmailList = (filteredData: { email: string }[]) => {
    const emails = filteredData.map((obj: { email: string }) => obj.email);

    mutationRemoveUsers.mutate(emails);
  };

  if (isLoading || isError || isCoursesLoading || isCoursesError) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header className={"justify-between"} title={data.name}></Header>

      <div className="flex flex-col gap-10">
        <div className={"flex flex-col gap-4"}>
          <Container title={"Your courses"}>
            <div className={"flex flex-col gap-2"}>
              {courses.length > 0 ? (
                courses.map((course) => {
                  const properties = [
                    { label: "Subject", value: course.subject },
                  ];

                  return (
                    <ListItem
                      key={nanoid()}
                      properties={properties}
                      href={`http://localhost:3000/dashboard/students/courses/${course.uuid}`}
                    >
                      {course.name}
                    </ListItem>
                  );
                })
              ) : (
                <span>You don&apos;t have any course yet</span>
              )}
            </div>
          </Container>
        </div>
        <div className={"flex flex-col gap-4"}>
          <TeamMainInformation
            onSubmit={handleUpdate}
            team={data}
            editable={false}
          />

          <Container>
            <Table
              columns={[
                { key: "first_name", label: "Firstname" },
                { key: "last_name", label: "Lastname" },
                { key: "email", label: "Email" },
                { key: "isTeacher", label: "Teacher" },
              ]}
              ordered
              data={data.users || []}
            />
          </Container>
        </div>
      </div>
    </div>
  );
}
