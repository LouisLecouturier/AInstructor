"use client";
import React from "react";

import { useSession } from "next-auth/react";
import { Button } from "@components/Layout/Interactions/Button";
import TeamMainInformation from "@components/Dashboard/Teams/MainInformation";
import { usePathname, useRouter } from "next/navigation";
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
import ListItem from "@/components/Layout/ListItem";
import { Course } from "@/types/course";
import { getCourses } from "@/requests/course";
import { nanoid } from "nanoid";

export default function TeamOverview({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const router = useRouter();
  const pathname = usePathname();


  const queryClient = useQueryClient();

  const uuid = searchParams.id;


  const { data, isLoading, isError } = useQuery<Team>({
    queryKey: ["team", uuid],
    queryFn: () => fetchTeam(String(token), searchParams.id),
    enabled: ![token, uuid].includes(undefined),
  });


  const { data : courses, isLoading : isCoursesLoading, isError : isCoursesError } = useQuery<Course[]>(["team", uuid, "courses"], {
    queryFn: () => getCoursesTeam(String(uuid), String(token)),
    enabled: !!token && !!uuid,
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
    console.log(emails);

    mutationRemoveUsers.mutate(emails);
  };



  if (isLoading || isError || isCoursesLoading || isCoursesError) {
    return <div>Loading...</div>;
  }

  console.log(courses);

  return (
    <div>
      <Header className={"justify-between"} title={data.name}>
      </Header>

      <div className="flex flex-col gap-10">
        <div className={"flex flex-col gap-4"}>
          <h2 className="text-2xl font-bold">Courses</h2>
          <Container
                title={"Your courses"}
            >
        <div className={"flex flex-col gap-2"}>
          {courses.length > 0 ? (
            courses.map((course) => {
              const properties = [
                { label: "Creation date", value: course.creationDate },
                { label: "Delivery date", value: course.deliveryDate },
                { label: "Subject", value: course.subject}
              ];

              return (
                <ListItem
                  key={nanoid()}
                  properties={properties}
                  href={`${pathname}/${course.uuid}`}
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
          <h2 className="text-2xl font-bold">Overview</h2>

          <TeamMainInformation onSubmit={handleUpdate} team={data} editable={false} />

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