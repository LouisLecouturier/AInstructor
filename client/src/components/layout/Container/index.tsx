import React, { FC } from "react";
import clsx from "clsx";

type ContainerProps = {
  title?: string;
  description?: string;
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
        <header>
          <h2 className={"flex items-center text-xl font-black"}>
            {props.title}
          </h2>
          {props.description && <span className={"text-sm text-dark-200 font-semibold"}>{props.description}</span>}
        </header>
      )}
      {props.children}
    </div>
  );
};

export default Container;
