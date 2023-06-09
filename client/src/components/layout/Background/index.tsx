import React, { FC, ReactNode } from "react";
import clsx from "clsx";

type BackgroundProps = {
  children: ReactNode;
  className?: string;
<<<<<<< HEAD
  rounded?: boolean;
};

const Background: FC<BackgroundProps> = (props) => {
  return (
    <div
      id="background "className={clsx(
        "w-full overflow-hidden bg-white",
        props.rounded && "rounded-lg",
        props.className
      )}
    >
      <div
        className={clsx(
          "relative min-h-full h-full min-w-full",
          "bg-gradient-to-br flex from-secondary-500/10 via-primary-500/10 to-secondary-500/10"
=======
  innerClassName?: string;
  rounded?: boolean;
};

const Shapes = () => {
  return (
    <>
      <div
        className={
          "absolute top-0 left-0 w-2/3 aspect-square bg-secondary-100 rounded-full -translate-x-1/3 -translate-y-1/3 blur-[200px] min-w-[640px]"
        }
      ></div>
      <div
        className={
          "absolute bottom-0 right-0 w-2/3 aspect-square bg-secondary-100 rounded-full translate-x-1/3 translate-y-1/3 blur-[200px] min-w-[640px]"
        }
      ></div>

      <div
        className={
          "absolute bottom-0 left-0 w-1/3 aspect-square bg-primary-300 rounded-full translate-x-1/4 translate-y-1/6 blur-[200px] min-w-[320px]"
        }
      ></div>
      <div
        className={
          "absolute top-0 right-0 w-1/3 aspect-square bg-primary-300 rounded-full translate-x-1/4 translate-y-1/6 blur-[200px] min-w-[320px]"
        }
      ></div>
    </>
  );
};

const Background: FC<BackgroundProps> = (props) => {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden bg-tertiary-10",
        props.rounded && "rounded-3xl",
        props.className
      )}
    >
      <Shapes />
      <div
        className={clsx(
          "relative min-h-full h-full min-w-full",
          props.innerClassName
>>>>>>> origin/FullStack
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Background;
