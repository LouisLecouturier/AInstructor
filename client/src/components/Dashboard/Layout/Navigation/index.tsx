"use client";

import Logout from "@icons/Logout.svg";
import { signOut, useSession } from "next-auth/react";

import clsx from "clsx";
import TeacherNavigation from "@components/Dashboard/Layout/Navigation/TeacherNavigation";
import NavigationElement from "@components/Dashboard/Layout/Navigation/NavigationElement";
import StudentNavigation from "@components/Dashboard/Layout/Navigation/StudentNavigation";
import UserInfo from "@components/Layout/User/Userinfo";

interface Students {
  Homeworks: string;
  Teams: string;
  Import: string;
  Stats: string;
  Settings: string;
}

interface Teachers {
  quizzs: string;
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
  quizzs: "",
  Teams: "",
  Stats: "",
  Settings: "",
};

export default function DashboardNavigation() {
  const { data: session } = useSession();

  const lastname = session?.user.last_name;
  const firstname = session?.user.first_name;
  const isTeacher = session?.user.isTeacher;

  return (
    <div className={clsx("flex flex-col justify-between", "w-64 relative")}>
      <div
        className={clsx(
          "flex flex-col justify-between",
          "w-full h-full py-8 px-4"
        )}
      >
        <UserInfo
          name={`${firstname} ${lastname}`}
          type={isTeacher ? "Teacher" : "Student"}
        />

        <div className="flex flex-col gap-4">
          {session?.user.isTeacher ? (
            <TeacherNavigation />
          ) : (
            <StudentNavigation />
          )}
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
