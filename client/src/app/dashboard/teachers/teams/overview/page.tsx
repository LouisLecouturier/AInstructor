"use client";
import React from "react";
import ListFieldMapping from "@components/dashboard/Table/legacy";
import { addUserMenu } from "@/store/displayMenu";
import { useSession } from "next-auth/react";
import { Button } from "@/components/Interactions/Button";
import TeamMainInformation from "@/components/dashboard/Teams/MainInformation";
import deleteTeam from "./deletehook";
import { useRouter } from "next/navigation";
import Container from "@components/layout/Container";
import Table from "@components/dashboard/Table";
import { useQuery } from "@tanstack/react-query";
import { Team } from "@/types/team";

import AddIcon from "@icons/Plus.svg";
import Input from "@components/Interactions/Forms/Input";
import Header from "@components/dashboard/Layout/Header";

interface user {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  is_teacher: boolean;
}

const userData: user[] = [
  {
    uuid: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@email.com",
    is_teacher: true,
  },
  {
    uuid: "2",
    first_name: "Jane",
    last_name: "Doe",
    email: "jane.doe@email.com",
    is_teacher: false,
  },
];

const fetchData = async (token: string, uuid: string) => {
  console.log("fetch");
  const response = await fetch(`http://localhost:8000/api/team/${uuid}`, {
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export default function TeamOverview({ searchParams }: { searchParams: any }) {
  const { data: session } = useSession();
  const router = useRouter();

  const id = String(session?.user.id);
  const token = String(session?.user.accessToken);

  const { data, isLoading } = useQuery<Team>(["teams"], () =>
    fetchData(token, searchParams.id)
  );

  async function handleClick() {
    const error = await deleteTeam(searchParams.id, token);
    if (!error) {
      console.log("redirect");
      router.push("/dashboard/teachers/teams");
    }
  }
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;
  };

  return (
    <div>
      <Header className={"justify-between"}>
        <h1 className={"w-3/4"}>{data?.name}</h1>
        <Button onClick={() => handleClick()} variant="secondary">
          Delete
        </Button>
      </Header>

      <div className={"flex flex-col gap-4"}>
        <h2 className="text-2xl font-bold">Overview</h2>

        <TeamMainInformation onSubmit={handleUpdate} team={data} />

        <Container title={"Members"}>
          <Table
            columns={[
              { key: "first_name", label: "Firstname" },
              { key: "last_name", label: "Lastname" },
              { key: "email", label: "Email" },
            ]}
            ordered
            data={userData}
          />
          <footer className={"flex gap-4"}>
            <Button size={"sm"} rounded={"full"} onClick={() => addUserMenu()}>
              <AddIcon className="w-5 h-5" />
              <span>Add user</span>
            </Button>
            <Input
              type="text"
              placeholder="Enter user's email"
              className={"flex-1 w-1/2"}
              size={"sm"}
              borders
            />
          </footer>
        </Container>

        <ListFieldMapping
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
        />
      </div>
    </div>
  );
}

// useEffect(() => {
//   console.log("fetching data");
//   if (token) {
//     (async () => {
//       let data: { name: string; users: user[] };
//       data = await getTeamInformation(searchParams.id, id, token);
//       setData({
//         name: data.name,
//         users: data.users,
//       });
//     })();
//   }
// }, [userType, firstname, lastname, searchParams.id, isDisplay, session]);
