import React, { FC } from "react";
import clsx from "clsx";

type ContainerMessageProps = {
  children: React.ReactNode;
  className?: string;
};

const ContainerMessage: FC<ContainerMessageProps> = (props) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-2",
        "p-8",
        "text-sm font-bold text-center text-dark-200 bg-dark-10 rounded-md"
      )}
    >
      {props.children}
    </div>
  );
};

export default ContainerMessage;
