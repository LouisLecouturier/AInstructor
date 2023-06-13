import React, { FC, ReactNode } from "react";
import clsx from "clsx";
import Image from "next/image";

import background from "@assets/images/background.webp";

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
    <Image
      src={background}
      alt={"background"}
      className={"absolute inset-0 w-full h-full pointer-events-none object-cover"}
    />
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
