import React, { FC } from "react";
import Avatar from "../Avatar";
import { UserStore } from "@/store/userStore";

type UserInfoProps = {
  name: string;
  type: string;
  avatar?: string;
  size?: "sm" | "md" | "lg";
};

//FIXME : Remove onClick event

const UserInfo: FC<UserInfoProps> = (props) => {
  const [userType, setUserType] = UserStore((state) => [
    state.userType,
    state.setUserType,
  ]);

  return (
    <div
      className="flex gap-4"
      onClick={() =>
        setUserType(userType === "teacher" ? "student" : "teacher")
      }
    >
      <Avatar size={props.size} />
      <div className="flex flex-col justify-center">
        <span className="text-dark-500 text-lg font-bold">{props.name}</span>
        <span className="text-dark-500 italic text-sm">{props.type}</span>
      </div>
    </div>
  );
};

export default UserInfo;
