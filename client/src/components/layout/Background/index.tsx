import React, { FC, ReactNode } from "react";
import clsx from "clsx";

type BackgroundProps = {
  children: ReactNode;
  className?: string;
};

const Background: FC<BackgroundProps> = (props) => {
  return (
    <div
      className={clsx(
        "relative w-full h-full overflow-hidden",
        "bg-gradient-to-br from-secondary-500/10 via-primary-500/10 to-secondary-500/10",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Background;
