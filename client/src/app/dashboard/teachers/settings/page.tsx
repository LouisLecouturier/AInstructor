// "use client";

// import React from "react";
// import Header from "@components/dashboard/Layout/Header";
// import Container from "@components/layout/Container";
// import UserInfo from "../../../../components/layout/User/Userinfo";
// import Information from "@components/layout/Information";

// const Settings = () => {
//   return (
//     <>
//       <Header title={"Settings"} />
//       <section className={"flex flex-col gap-8"}>
//         <Container title="Personal informations">
//           <UserInfo name="Johana Doetek" type="Teacher" />
//           <div className={"flex flex-col gap-4"}>
//             <div className={"flex gap-8"}>
//               <div className={"flex flex-col gap-4 w-full"}>
//                 <Information
//                   label="Firstname"
//                   value="Louis"
//                   name={"firstname"}
//                   editable
//                 />
//                 <Information
//                   label="Email"
//                   value="louis.lecouturier@student.junia.com"
//                   name={"email"}
//                   editable
//                 />
//               </div>
//               <div className={"flex flex-col gap-4 w-full"}>
//                 <Information
//                   label="Lastname"
//                   value="Lecouturier"
//                   name={"lastname"}
//                   editable
//                 />
//                 <Information
//                   label="Phone"
//                   value="+33 6 52 02 54 15"
//                   name={"phone"}
//                   editable
//                 />
//               </div>
//             </div>
//             <Information
//               label="Biography"
//               value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim uuid est laborum."
//               editable
//               name={"biography"}
//               isTextArea
//             />
//           </div>
//         </Container>
//         <Container title="Coordinates">
//           <div className={"flex gap-8"}>
//             <div className={"flex flex-col gap-4 w-full"}>
//               <Information
//                 label="Address"
//                 value="52 Rue du Faubourg de Roubaix"
//                 editable
//                 name={"address"}
//               />
//               <Information
//                 label="Post Code"
//                 value="59800"
//                 name={"post_code"}
//                 editable
//               />
//             </div>
//             <div className={"flex flex-col gap-4 w-full"}>
//               <Information label="City" value="Lille" name={"city"} editable />
//               <Information
//                 label="Country"
//                 value="🇫🇷 France"
//                 name={"country"}
//                 editable
//               />
//             </div>
//           </div>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default Settings;
"use client";

import Container from "@components/layout/Container";
import UserInfo from "../../../../components/layout/User/Userinfo";
import Information from "@components/layout/Information";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { fetchUser, updateUser } from "@/requests/user";
import { Button } from "@/components/Interactions/Button";
import Header from "@/components/dashboard/Layout/Header";
import { User } from "@/types/user";

const Settings = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const queryClient = useQueryClient();



  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(String(token), String(id)),
    enabled: (token || id ) === undefined ? false : true,
  });



  const mutationUpdateUser = useMutation({
    mutationFn: (user : User) => updateUser(user, String(token)),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
    } 
  });

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Form = new FormData(e.currentTarget);
    const user = {
      id : id,
      isTeacher : Form.get("isTeacher") ? Form.get("isTeacher") : data?.isTeacher,
      username : Form.get("username") ? Form.get("username") : data?.username,

      first_name: Form.get("firstname") ? Form.get("firstname") : data?.first_name,
      last_name: Form.get("lastname") ? Form.get("lastname") : data?.last_name,
      email: Form.get("email") ? Form.get("email") : data?.email,
      phone: Form.get("phone") ? Form.get("phone") : data?.phone,
      bio: Form.get("biography") ? Form.get("biography") : data?.bio,


      city : Form.get("city") ? Form.get("city") : data?.city,
      address : Form.get("address") ? Form.get("address") : data?.address,
      postalCode : Form.get("post_code") ? Form.get("post_code") : data?.postalCode,
      country : Form.get("country") ? Form.get("country") : data?.country,
    };


    console.log("submit");
    mutationUpdateUser.mutate(user as User);
  }

  if (isLoading || isError) return <div>Loading...</div>;


  return (
    <>
      <Header title={"Settings"}></Header>
      <section className={"flex flex-col gap-4"}>
        <Container title="Personal informations">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <UserInfo name={data.first_name +" "+ data.last_name} type={data.isTeacher ? "Teacher" : "Student"} />
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
              <Information label="Post Code" value={data.postalCode} name={"post_code"} editable />
            </div>
            <div className={"flex flex-col gap-4 w-full"}>
              <Information label="City" value={data.city} name={"city"} editable />
              <Information label="Country" value={data.country} name={"country"} editable />
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
}

export default Settings;