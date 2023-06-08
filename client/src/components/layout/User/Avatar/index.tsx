"use client";

import React, { FC } from "react";
import Image from "next/image";

import DefaultAvatar from "@icons/Avatar.svg";
import clsx from "clsx";

type AvatarProps = {
  image?: string;
  size?: "sm" | "md" | "lg";
};

const sizesClassNames = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

const Avatar: FC<AvatarProps> = (props) => {
  const avatarClassNames = clsx(
    sizesClassNames[props.size || "md"],
    "object-cover rounded-full"
  );

  if (props.image) {
    return <Image src={props.image} alt="avatar" className={avatarClassNames} />;
  }

  return <DefaultAvatar className={avatarClassNames}/>;
};

export default Avatar;
