"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { deleteUser, fetchUser } from "@/requests/user";
import { User } from "@/types/user";
import Header from "@/components/Dashboard/Common/Layout/Header";
import { Button } from "@/components/Layout/Interactions/Button";
import Information from "@/components/Layout/Information";
import UserInfo from "@/components/Layout/User/Userinfo";
import Container from "@/components/Layout/Container";
import Skeleton from "@components/Layout/Skeleton";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";

const Settings = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(String(token), String(id)),
    enabled: ![token, id].includes(undefined),
  });

  const mutationDeleteUser = useMutation({
    mutationFn: () => deleteUser(String(id), String(token)),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["user", id]);
      await signOut();
    },
  });

  if (isError) {
    return (
      <>
        <Header title={"Ooops"} />
        <Container title="Personal informations">
          <ContainerMessage>
            An error occurred while loading your informations.
          </ContainerMessage>
        </Container>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header title={"Settings"} />
        <Container title="Personal informations">
          <div className="flex flex-col gap-4">
            <Skeleton className={"w-1/2 h-20"} />
            <div className={"flex flex-col gap-4"}>
              <div className={"flex gap-8"}>
                <div className={"flex flex-col gap-4 w-full"}>
                  <Information
                    label="Firstname"
                    value={""}
                    isLoading
                    name={"firstname"}
                  />
                  <Information
                    label="Email"
                    value={""}
                    isLoading
                    name={"email"}
                  />
                </div>
                <div className={"flex flex-col gap-4 w-full"}>
                  <Information
                    label="Lastname"
                    value={""}
                    isLoading
                    name={"lastname"}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header title={"Settings"} className="justify-between">
        <Button onClick={() => mutationDeleteUser.mutate()} variant="secondary">
          Delete my account
        </Button>
      </Header>
      <Container title="Personal informations">
        <div className="flex flex-col gap-4">
          <UserInfo
            name={data.first_name + " " + data.last_name}
            type={data.isTeacher ? "Teacher" : "Student"}
          />
          <div className={"flex flex-col gap-4"}>
            <div className={"flex gap-8"}>
              <div className={"flex flex-col gap-4 w-full"}>
                <Information
                  label="Firstname"
                  value={data.first_name}
                  name={"firstname"}
                />
                <Information label="Email" value={data.email} name={"email"} />
              </div>
              <div className={"flex flex-col gap-4 w-full"}>
                <Information
                  label="Lastname"
                  value={data.last_name}
                  name={"lastname"}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Settings;
