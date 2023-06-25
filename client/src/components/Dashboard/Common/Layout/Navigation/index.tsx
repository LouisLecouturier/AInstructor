"use client";

import Logout from "@icons/Logout.svg";
import { signOut, useSession } from "next-auth/react";

import clsx from "clsx";
import UserInfo from "@components/Layout/User/Userinfo";
import TeacherNavigation from "./TeacherNavigation";
import StudentNavigation from "./StudentNavigation";
import NavigationElement from "./NavigationElement";
import { toastStore } from "@components/Layout/Toast/toast.store";

export default function DashboardNavigation() {
  const { data: session } = useSession();
  const openToast = toastStore((state) => state.openToast);

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
          onClick={() => {
            signOut().then(() => {
              openToast("success", "Logged out");
            });
          }}
        />
      </div>
    </div>
  );
}
