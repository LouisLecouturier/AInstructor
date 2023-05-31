import React, { FC, ReactNode } from "react";
import clsx from "clsx";

type BackgroundProps = {
  children: ReactNode;
  className?: string;
  rounded?: boolean;
};

const Background: FC<BackgroundProps> = (props) => {
  return (
    <div
      className={clsx(
        "w-full overflow-hidden bg-white",
        props.rounded && "rounded-lg",
        props.className
      )}
    >
      <div
        className={clsx(
          "relative min-h-full h-full min-w-full",
          "bg-gradient-to-br from-secondary-500/10 via-primary-500/10 to-secondary-500/10"
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Background;
