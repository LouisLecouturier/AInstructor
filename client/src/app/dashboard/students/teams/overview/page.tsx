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






  



  if (isLoading || isError) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Header className={"justify-between"}>
        <h1 className={"w-3/4"}>{data?.name}</h1>
        
      </Header>

      <div className={"flex flex-col gap-4"}>
        <h2 className="text-2xl font-bold">Overview</h2>

        <TeamMainInformation readonly={true} team={data} />

        <Container>
          <Table
            columns={[
              { key: "first_name", label: "Firstname" },
              { key: "last_name", label: "Lastname" },
              { key: "email", label: "Email" },
              { key: "isTeacher", label: "Teacher" },
            ]}
            ordered
            data={data.users}
          />

        </Container>

      </div>
    </div>
  );
}
