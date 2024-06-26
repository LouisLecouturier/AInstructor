import React, { FC } from "react";
import Avatar from "../Avatar";

type UserInfoProps = {
  name: string;
  type: string;
  avatar?: string;
  size?: "sm" | "md" | "lg";
};

//FIXME : Remove onClick event

const UserInfo: FC<UserInfoProps> = (props) => {

  return (
    <div
      className="flex gap-4 items-center"
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
