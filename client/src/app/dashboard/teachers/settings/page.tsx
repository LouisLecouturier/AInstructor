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

const Settings = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const { openToast } = toastStore();

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
      queryClient.invalidateQueries(["user", id]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Form = new FormData(e.currentTarget);
    const user = {
      id: id,
      isTeacher: Form.get("isTeacher")
        ? Form.get("isTeacher")
        : data?.isTeacher,
      username: Form.get("username") ? Form.get("username") : data?.username,

      first_name: Form.get("firstname")
        ? Form.get("firstname")
        : data?.first_name,
      last_name: Form.get("lastname") ? Form.get("lastname") : data?.last_name,
      email: Form.get("email") ? Form.get("email") : data?.email,
      phone: Form.get("phone") ? Form.get("phone") : data?.phone,
      bio: Form.get("biography") ? Form.get("biography") : data?.bio,

      city: Form.get("city") ? Form.get("city") : data?.city,
      address: Form.get("address") ? Form.get("address") : data?.address,
      postalCode: Form.get("post_code")
        ? Form.get("post_code")
        : data?.postalCode,
      country: Form.get("country") ? Form.get("country") : data?.country,
    };

    console.log("submit");
    mutationUpdateUser.mutate(user as User);
  };

  if (isLoading || isError) return <div>Loading...</div>;

  return (
    <>
      <Header title={"Settings"} />
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
