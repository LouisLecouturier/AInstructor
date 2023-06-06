import React from "react";
import Header from "@components/dashboard/Layout/Header";
import EditButton from "@components/button/editbutton";
import Container from "@components/layout/Container";
import UserInfo from "../../../../components/layout/User/Userinfo";
import Information from "@components/layout/Information";

const Settings = () => {
  return (
    <>
      <Header>Settings</Header>
      <section className={"flex flex-col gap-4"}>
        <Container title="Personal informations">
          <UserInfo name="Johana Doetek" type="Teacher" />
          <div className={"flex flex-col gap-4"}>
            <div className={"flex gap-8"}>
              <div className={"flex flex-col gap-4 w-full"}>
                <Information
                  label="Firstname"
                  value="Louis"
                  name={"firstname"}
                  editable
                />
                <Information
                  label="Email"
                  value="louis.lecouturier@student.junia.com"
                  name={"email"}
                  editable
                />
              </div>
              <div className={"flex flex-col gap-4 w-full"}>
                <Information
                  label="Lastname"
                  value="Lecouturier"
                  name={"lastname"}
                  editable
                />
                <Information
                  label="Phone"
                  value="+33 6 52 02 54 15"
                  name={"phone"}
                  editable
                />
              </div>
            </div>
            <Information
              label="Biography"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              editable
              name={"biography"}
              isTextArea
            />
          </div>
        </Container>
        <Container title="Coordinates">
          <div className={"flex gap-8"}>
            <div className={"flex flex-col gap-4 w-full"}>
              <Information
                label="Address"
                value="52 Rue du Faubourg de Roubaix"
                editable
                name={"address"}
              />
              <Information label="Post Code" value="59800" name={"post_code"} editable />
            </div>
            <div className={"flex flex-col gap-4 w-full"}>
              <Information label="City" value="Lille" name={"city"} editable />
              <Information label="Country" value="🇫🇷 France" name={"country"} editable />
            </div>
          </div>
        </Container>
      </section>
    </>
  );

};

export default Settings;
