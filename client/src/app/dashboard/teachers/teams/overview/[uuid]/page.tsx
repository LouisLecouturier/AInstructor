"use client";
import React from "react";

import { useSession } from "next-auth/react";
import { Button } from "@components/Layout/Interactions/Button";
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

import AddIcon from "@icons/Plus.svg";
import Input from "@components/Layout/Interactions/Forms/Input";
import Header from "@components/Dashboard/Common/Layout/Header";
import { Course } from "@/types/course";
import ListItem from "@components/Layout/ListItem";
import { nanoid } from "nanoid";
import { deleteCourse } from "@requests/course";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";

export default function TeamOverview({ params }: { params: { uuid: string } }) {
  const { data: session } = useSession();
  const router = useRouter();

  const queryClient = useQueryClient();

  const token = session?.user.accessToken;
  const uuid = params.uuid;

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
    enabled: !!token && !!uuid,
  });

  const mutation = useMutation({
    mutationFn: () => deleteTeam(uuid, String(token)),
    onSuccess: () => {
      router.push("/dashboard/teachers/teams");
      return queryClient.invalidateQueries(["teams"]);
    },
  });

  const mutationAddUsers = useMutation({
    mutationFn: (emails: string[]) => addUsers(uuid, emails, String(token)),
    onSuccess: () => queryClient.invalidateQueries(["team", uuid]),
  });

  const mutationRemoveUsers = useMutation({
    mutationFn: (emails: string[]) => removeUsers(uuid, emails, String(token)),
    onSuccess: () => queryClient.invalidateQueries(["team", uuid]),
  });

  const mutationUpdateTeam = useMutation({
    mutationFn: (team: Omit<Team, "users" | "uuid">) =>
      updateTeam(uuid, team, String(token)),
    onSuccess: () => queryClient.invalidateQueries(["team", uuid]),
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
    console.log(emails);

    mutationRemoveUsers.mutate(emails);
  };

  const handleDelete = async (uuid: string) => {
    if (token) {
      await deleteCourse(uuid, token);
      location.reload();
    }
  };

  const goTo = (path: string) => {
    router.push(path);
  };

  if (isLoading || isError || isCoursesLoading || isCoursesError) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header
        breadcrumbsReplace={[{ current: uuid, value: data.name }]}
        className={"justify-between"}
        title={data?.name}
      >
        <Button onClick={() => mutation.mutate()} variant="secondary">
          Delete
        </Button>
      </Header>

      <div className="flex flex-col gap-8">
        <Container
          title={"Your courses"}
          description={"Preview, manage, delete your courses"}
        >
          <div className={"flex flex-col gap-2"}>
            {courses.length > 0 ? (
              courses.map((course) => {
                const properties = [
                  { label: "Creation date", value: course.creationDate },
                  { label: "Delivery date", value: course.deliveryDate },
                  { label: "Subject", value: course.subject },
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
                  >
                    {course.name}
                  </ListItem>
                );
              })
            ) : (
              <ContainerMessage>
                You don&apos;t have any course yet
              </ContainerMessage>
            )}
          </div>
        </Container>

        <TeamMainInformation editable onSubmit={handleUpdate} team={data} />

        <Container title={"Members"}>
          <Table
            columns={[
              { key: "first_name", label: "Firstname" },
              { key: "last_name", label: "Lastname" },
              { key: "email", label: "Email" },
              { key: "isTeacher", label: "Teacher" },
            ]}
            ordered
            selectable
            actions={["edit", "delete"]}
            data={data.users || []}
            delete={(filteredData: { email: string }[]) =>
              getEmailList(filteredData)
            }
          />

          <form onSubmit={handleSubmitAddUser}>
            <footer className={"flex gap-4"}>
              <Button size={"sm"} rounded={"full"} type="submit">
                <AddIcon className="w-5 h-5" />
                <span>Add user</span>
              </Button>

              <Input
                type="email"
                placeholder="Enter user's email"
                className={"flex-1 w-1/2"}
                size={"sm"}
                name="email"
                borders
              />
            </footer>
          </form>
        </Container>
      </div>
    </div>
  );
}
