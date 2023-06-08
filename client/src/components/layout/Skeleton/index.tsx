import React, { FC } from "react";
import styles from "./Skeleton.module.scss";
import clsx from "clsx";

type SkeletonProps = {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
};

const roundedClassNames = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const Skeleton: FC<SkeletonProps> = (props) => {
  return (
    <div
      className={clsx(
        roundedClassNames[props.rounded || "sm"],
        styles["skeleton"],
        props.className
      )}
    ></div>
  );
};

export default Skeleton;
