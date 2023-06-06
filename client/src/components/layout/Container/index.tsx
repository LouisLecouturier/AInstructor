import React, { FC } from "react";
import clsx from "clsx";

type ContainerProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const Container: FC<ContainerProps> = (props) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-6",
        "p-6 rounded-xl",
        "bg-white",
        props.className
      )}
    >
      {props.title && (
        <h2 className={"flex items-center text-xl font-black"}>
          {props.title}
        </h2>
      )}
      {props.children}
    </div>
  );
};

export default Container;
