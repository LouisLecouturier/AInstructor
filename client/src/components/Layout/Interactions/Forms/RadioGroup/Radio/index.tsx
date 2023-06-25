import React, { FC } from "react";
import clsx from "clsx";

type RadioProps = {
  variant: "accent" | "primary" | "secondary";
  size: "sm" | "md" | "lg";
  checked?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const variantClasses = {
  accent: "bg-accent-500",
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
};

const Radio: FC<RadioProps> = (props) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "rounded-full",
        props.checked ? variantClasses[props.variant || "accent"] : "bg-white border border-dark-100 ",
        sizeClasses[props.size || "md"],
        "transition",
        props.className
      )}
    >
      <span
        className={clsx(
          "w-1/3 h-1/3",
          "bg-white rounded-full",
          "transition"
        )}
      ></span>
    </div>
  );
};

export default Radio;
