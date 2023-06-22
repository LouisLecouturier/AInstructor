import clsx from "clsx";
import React, { FC } from "react";

type InputProps = {
  id?: string;
  inputRef?: React.Ref<HTMLTextAreaElement>;
  placeholder?: string;
  name?: string;
  borders?: boolean;
  type?: "text" | "password" | "email" | "number";
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  defaultValue?: string;
  textarea?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  frozen?: boolean;
};

const sizesClassNames = {
  sm: "text-sm px-2 h-10 rounded-md",
  md: "text-md px-3 h-12 rounded-lg",
  lg: "text-lg px-4 rounded-lg",
};

export const Input: FC<InputProps> = (props) => {
  if (props.textarea) {
    return (
      <textarea
        ref={props.inputRef}
        id={props.id}
        className={clsx(
          props.className,
          "w-full min-h-[8rem]",
          "bg-white font-semibold text-dark-300",
          props.borders && "border-2 border-dark-50 focus:border-accent-200",
          sizesClassNames[props.size || "md"],
          "py-2 px-2",
          "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-20"
        )}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
        defaultValue={props.defaultValue}
        disabled={props.frozen}
      />
    );
  }

  return (
    <input
      id={props.id}
      className={clsx(
        props.className,
        "w-full",
        "bg-white font-semibold rounded-lg text-dark-300",
        props.borders && "border-2 border-dark-50 focus:border-accent-200",
        sizesClassNames[props.size || "md"],
        "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-20"
      )}
      type={props.type || "text"}
      onChange={props.onChange}
      placeholder={props.placeholder}
      name={props.name}
      defaultValue={props.defaultValue}
      disabled={props.frozen}
    />
  );
};

export default Input;
