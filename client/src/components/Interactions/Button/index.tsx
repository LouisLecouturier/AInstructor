import { FC, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "accent" | "primary" | "secondary" | "tertiary" | "success";
  rounded?: "sm" | "md" | "lg" | "full";
  outlined?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  fluid?: boolean;
  isMagic?: boolean;
  responsive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const sizeClasses = {

  sm: "px-4 py-2 text-sm h-10 min-w-[96px] gap-2",
  md: "px-6 py-3 text-lg h-14 min-w-[96px] gap-4",
  lg: "px-8 py-4 text-lg h-16 gap-4",
};

const roundedClasses = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
};


const variantClasses = {
  accent: "bg-accent-500 hover:bg-accent-600 focus:bg-accent-700 text-white",
  primary:
    "bg-primary-500 hover:bg-primary-600 focus:bg-primary-700 text-white",
  secondary:
    "bg-secondary-500 hover:bg-secondary-600 focus:bg-secondary-700 text-white",
  tertiary: "bg-transparent text-primary-500",
  success: "bg-green-500 hover:bg-green-600 focus:bg-green-700 text-white",
};

const outlinedClasses = {
  accent:
    "border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white focus:bg-accent-600 focus:border-accent-600 focus:text-white",
  primary:
    "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:bg-primary-600 focus:border-primary-600 focus:text-white",
  secondary:
    "border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white focus:bg-secondary-600 focus:border-secondary-600 focus:text-white",
  tertiary:
    "border-2 border-tertiary-500 text-tertiary-500 hover:bg-tertiary-500 hover:text-white focus:bg-tertiary-600 focus:border-tertiary-600 focus:text-white",
  success:
    "border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white focus:bg-green-600 focus:border-green-600 focus:text-white",
};

export const Button: FC<ButtonProps> = (props) => {
  if (props.isMagic) {
    return (
      <div
        onClick={props.onClick}
        className={clsx(
          "flex items-center justify-center",
          "w-fit transition duration-200",
          "font-bold cursor-pointer",
          roundedClasses[props.rounded || "md"],
          sizeClasses[props.size || "md"],
          props.fluid && "w-full",
          props.responsive && "w-full md:w-fit",
          props.outlined
            ? outlinedClasses[props.variant || "accent"]
            : variantClasses[props.variant || "accent"],
          props.disabled && "opacity-50 cursor-not-allowed",
          styles["magic-button"],
          props.className
        )}
      >
        {props.children}
      </div>
    );
  }

  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className={clsx(
        "flex items-center justify-center",
        "w-fit transition duration-200",
        "font-bold cursor-pointer",
        roundedClasses[props.rounded || "md"],
        sizeClasses[props.size || "md"],
        props.fluid && "w-full",
        props.responsive && "w-full md:w-fit",
        props.outlined
          ? outlinedClasses[props.variant || "accent"]
          : variantClasses[props.variant || "accent"],
        props.disabled && "opacity-50 cursor-not-allowed",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
