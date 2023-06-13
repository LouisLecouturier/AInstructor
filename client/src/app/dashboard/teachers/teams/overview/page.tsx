"use client";
import React from "react";
import ListFieldMapping from "@components/dashboard/Table/legacy";
import { addUserMenu } from "@/store/displayMenu";
import { useSession } from "next-auth/react";
import { Button } from "@/components/Interactions/Button";
import TeamMainInformation from "@/components/dashboard/Teams/MainInformation";
import { useRouter } from "next/navigation";
import Container from "@components/layout/Container";
import Table from "@components/dashboard/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Team ,User } from "@/types/team";
import { fetchTeam, deleteTeam , addUsers, updateTeam, removeUsers} from "@/request";

import AddIcon from "@icons/Plus.svg";
import Input from "@components/Interactions/Forms/Input";
import Header from "@components/dashboard/Layout/Header";




export default function TeamOverview({ searchParams }: { searchParams: {id : string} }) {
  const { data: session } = useSession();
  const router = useRouter();

  const queryClient = useQueryClient();
  
  const token = session?.user.accessToken;
  const uuid = searchParams.id;

  const { data, isLoading, isError } = useQuery<Team>({
    queryKey: ["team", uuid],
    queryFn: () => fetchTeam(String(token), searchParams.id),
    enabled: (token || uuid ) === undefined ? false : true,
  });



  const mutation = useMutation({
    mutationFn: () => deleteTeam(uuid, String(token)),
    onSuccess: () => {
      router.push("/dashboard/teachers/teams");
      queryClient.invalidateQueries(["teams"]);
    }
  });


  const mutationAddUsers = useMutation({
    mutationFn: (emails : string[]) => addUsers(uuid, emails, String(token)),
    onSuccess: () => {
      queryClient.invalidateQueries(["team", uuid]);
    }
  });

  const mutationRemoveUsers = useMutation({
    mutationFn: (emails : string[]) => removeUsers(uuid, emails, String(token)),
    onSuccess: () => {
      queryClient.invalidateQueries(["team", uuid]);
    }
  });


  const mutationUpdateTeam = useMutation({
    mutationFn: (team :Omit<Team, "users"|"uuid">) => updateTeam(uuid, team, String(token)),
    onSuccess: () => {
      queryClient.invalidateQueries(["team", uuid]);
    } 
  });



  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    if (data) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const team : Team = {
        users : data.users,
        uuid : Number(uuid),
        name : String(formData.get("name")) == "" ? data.name : String(formData.get("name")),
        description : String(formData.get("description")) == "" ? data.description : String(formData.get("description")),
        color : String(formData.get("color")) == "" ? data.color : String(formData.get("color")),
      }

      mutationUpdateTeam.mutate(team);
    }
  };

  const handleSubmitAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    mutationAddUsers.mutate([email]);
  };






  if (isLoading || isError) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Header className={"justify-between"}>
        <h1 className={"w-3/4"}>{data?.name}</h1>
        <Button onClick={() => mutation.mutate()} variant="secondary">
          Delete
        </Button>
      </Header>

      <div className={"flex flex-col gap-4"}>
        <h2 className="text-2xl font-bold">Overview</h2>

        <TeamMainInformation onSubmit={handleUpdate} team={data} />

        <Container>
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
            data={data.users}
            Delete={(emails) => mutationRemoveUsers.mutate(emails)}
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

        {/* <ListFieldMapping
          users={userData}
          nameField="Members"
          modelPrimaryKey={searchParams.id}
          modelFieldList={[
            { name: "name", email: "email" },
            { is_teacher: "is_teacher", id: "id" },
          ]}
          urlDeleteLine="http://localhost:8000/api/group/removeUser"
          urlAddLine="http://localhost:8000/api/group/addUser"
          placeholderPrimaryKeyElementAdd="Email"
        /> */}
      </div>
    </div>
  );
}
