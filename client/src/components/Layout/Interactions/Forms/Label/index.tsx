import React, { FC } from "react";
import clsx from "clsx";

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
};

const Label: FC<LabelProps> = (props) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className={clsx("font-semibold", props.className)}
    >
      {props.children}
    </label>
  );
};

export default Label;
