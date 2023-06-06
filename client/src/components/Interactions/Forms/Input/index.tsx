import clsx from "clsx";
import { FC } from "react";

type InputProps = {
  placeholder?: string;
  name: string;
  borders?: boolean;
  defaultValue?: string;
  isTextArea?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizesClassNames = {
  sm: "text-sm px-2 h-10 rounded-md",
  md: "text-md h-12 rounded-lg",
  lg: "text-lg rounded-lg",
};

export const Input: FC<InputProps> = (props) => {
  if (props.isTextArea) {
    return (
      <textarea
        className={clsx(
          "w-full min-h-[8rem] px-4 py-2",
          "bg-white font-semibold text-dark-300",
          props.borders && "border-2 border-dark-50 focus:border-accent-200",
          sizesClassNames[props.size || "md"],
          "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-20"
        )}
        placeholder={props.placeholder}
        name={props.name}
        defaultValue={props.defaultValue}
      />
    );
  }

  return (
    <input
      className={clsx(
        "w-full px-4",
        "bg-white font-semibold rounded-lg text-dark-300",
        props.borders && "border-2 border-dark-50 focus:border-accent-200",
        sizesClassNames[props.size || "md"],
        "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-20"
      )}
      placeholder={props.placeholder}
      name={props.name}
      defaultValue={props.defaultValue}
    />
  );
};

export default Input;
