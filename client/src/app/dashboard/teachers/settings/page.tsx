"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { fetchUser, updateUser } from "@/requests/user";
import { User } from "@/types/user";
import Header from "@/components/Dashboard/Common/Layout/Header";
import { Button } from "@/components/Layout/Interactions/Button";
import Information from "@/components/Layout/Information";
import UserInfo from "@/components/Layout/User/Userinfo";
import Container from "@/components/Layout/Container";
import { toastStore } from "@components/Layout/Toast/toast.store";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";

const Settings = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const openToast = toastStore((state) => state.openToast);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(String(token), String(id)),

    enabled: (token || id) !== undefined,
  });

  const mutationUpdateUser = useMutation({
    mutationFn: (user: User) => updateUser(user, String(token)),
    onMutate: () => {
      openToast("info", "Updating user...");
    },
    onSuccess: () => {
      openToast("success", "User updated");
      return queryClient.invalidateQueries(["user", id]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Form = new FormData(e.currentTarget);
    const user = {
      id,
      isTeacher: Form.get("isTeacher") ?? data?.isTeacher,
      username: Form.get("username") ?? data?.username,

      first_name: Form.get("firstname") ?? data?.first_name,
      last_name: Form.get("lastname") ?? data?.last_name,
      email: Form.get("email") ?? data?.email,
      phone: Form.get("phone") ?? data?.phone,
      bio: Form.get("biography") ?? data?.bio,

      city: Form.get("city") ?? data?.city,
      address: Form.get("address") ?? data?.address,
      postalCode: Form.get("post_code") ?? data?.postalCode,
      country: Form.get("country") ?? data?.country,
    };

    mutationUpdateUser.mutate(user as User);
  };

  if (isError) {
    return (
      <>
        <Header title={"Settings"} />
        <section className={"flex flex-col gap-4"}>
          <Container title="Personal informations">
            <ContainerMessage>
              An error occurred while loading your data, please try again later.
            </ContainerMessage>
          </Container>

          <Container title="Coordinates">
            <ContainerMessage>
              An error occurred while loading your data, please try again later.
            </ContainerMessage>
          </Container>
        </section>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header title={"Settings"} />
        <section className={"flex flex-col gap-4"}>
          <Container title="Personal informations">
            <div className={"flex flex-col gap-4"}>
              <div className={"flex gap-8"}>
                <div className={"flex flex-col gap-4 w-full"}>
                  <Information
                    label="Firstname"
                    value={""}
                    isLoading
                    name={"firstname"}
                    editable
                  />
                  <Information
                    label="Email"
                    value={""}
                    isLoading
                    name={"email"}
                    editable
                  />
                </div>
                <div className={"flex flex-col gap-4 w-full"}>
                  <Information
                    label="Lastname"
                    value={""}
                    isLoading
                    name={"lastname"}
                    editable
                  />
                  <Information
                    label="Phone"
                    value={""}
                    isLoading
                    name={"phone"}
                    editable
                  />
                </div>
              </div>
              <Information
                label="Biography"
                value={""}
                isLoading
                editable
                name={"biography"}
                isTextArea
              />
            </div>
          </Container>

          <Container title="Coordinates">
            <div className="flex flex-col gap-4">
              <div className={"flex gap-8"}>
                <div className={"flex flex-col gap-4 w-full"}>
                  <Information
                    label="Address"
                    value={""}
                    isLoading
                    editable
                    name={"address"}
                  />
                  <Information
                    label="Post Code"
                    value={""}
                    isLoading
                    name={"post_code"}
                    editable
                  />
                </div>
                <div className={"flex flex-col gap-4 w-full"}>
                  <Information
                    label="City"
                    value={""}
                    isLoading
                    name={"city"}
                    editable
                  />
                  <Information
                    label="Country"
                    name={"country"}
                    value={""}
                    isLoading
                    editable
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <Header className={"justify-between"} title={"Settings"}>
        <Button onClick={() => console.log("click")} variant="secondary">
          Delete
        </Button>
      </Header>
      <section className={"flex flex-col gap-4"}>
        <Container title="Personal informations">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    editable
                  />
                  <Information
                    label="Email"
                    value={data.email}
                    name={"email"}
                    editable
                  />
                </div>
                <div className={"flex flex-col gap-4 w-full"}>
                  <Information
                    label="Lastname"
                    value={data.last_name}
                    name={"lastname"}
                    editable
                  />
                  <Information
                    label="Phone"
                    value={data.phone}
                    name={"phone"}
                    editable
                  />
                </div>
              </div>
              <Information
                label="Biography"
                value={data.bio}
                editable
                name={"biography"}
                isTextArea
              />
            </div>
            <Button type="submit" variant="accent" size="sm">
              Save
            </Button>
          </form>
        </Container>

        <Container title="Coordinates">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className={"flex gap-8"}>
              <div className={"flex flex-col gap-4 w-full"}>
                <Information
                  label="Address"
                  value={data.address}
                  editable
                  name={"address"}
                />
                <Information
                  label="Post Code"
                  value={data.postalCode}
                  name={"post_code"}
                  editable
                />
              </div>
              <div className={"flex flex-col gap-4 w-full"}>
                <Information
                  label="City"
                  value={data.city}
                  name={"city"}
                  editable
                />
                <Information
                  label="Country"
                  value={data.country}
                  name={"country"}
                  editable
                />
              </div>
            </div>
            <Button type="submit" variant="accent" size="sm">
              Save
            </Button>
          </form>
        </Container>
      </section>
    </>
  );
};

export default Settings;
