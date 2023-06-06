"use client";

import { UserStore } from "@/store/userStore";

import Logout from "@icons/Logout.svg";
import { signOut } from "next-auth/react";
import clsx from "clsx";
import TeacherNavigation from "@components/dashboard/Navigation/TeacherNavigation";
import NavigationElement from "@components/dashboard/Navigation/NavigationElement";
import StudentNavigation from "@components/dashboard/Navigation/StudentNavigation";
import UserInfo from "../../layout/User/Userinfo";

interface Students {
  Homeworks: string;
  Teams: string;
  Import: string;
  Stats: string;
  Settings: string;
}

interface Teachers {
  Questionnaires: string;
  Teams: string;
  Stats: string;
  Settings: string;
}

const Students: Students = {
  Homeworks: "",
  Teams: "",
  Import: "",
  Stats: "",
  Settings: "",
};

const Teachers: Teachers = {
  Questionnaires: "",
  Teams: "",
  Stats: "",
  Settings: "",
};

export default function DashboardNavigation() {
  const userType = UserStore((state) => state.userType);
  const lastname = UserStore((state) => state.lastname);
  const firstname = UserStore((state) => state.firstname);


  return (
    <div className={clsx("flex flex-col justify-between", "w-60 relative")}>
      {/*<Yellow className="absolute left-0 top-0 -z-10 -translate-x-1/3 -translate-y-1/2 w-full h-2/3" />*/}

      <div
        className={clsx("flex flex-col justify-between", "w-full h-full py-12")}
      >
        <div className={"flex flex-col gap-16"}>
          <UserInfo type={userType} name={`${firstname} ${lastname}`} />

          <div className="flex flex-col gap-4">
            {userType === "teacher" ? (
              <TeacherNavigation />
            ) : (
              <StudentNavigation />
            )}
          </div>
        </div>

        <NavigationElement
          icon={<Logout />}
          label={"Log out"}
          onClick={signOut}
        />
      </div>
    </div>
  );
}
