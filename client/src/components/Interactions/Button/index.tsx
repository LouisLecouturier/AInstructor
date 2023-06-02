import { FC, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "accent" | "primary" | "secondary" | "tertiary";
  rounded?: "sm" | "md" | "lg" | "full";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  fluid?: boolean;
  responsive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm min-w-[120px]",
  md: "px-6 py-3 text-lg min-h-[3rem] min-w-[120px]",
  lg: "px-8 py-4 text-lg",
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
};

export const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className={clsx(
        "flex items-center justify-center gap-4",
        "w-fit transition duration-200",
        "font-bold",
        roundedClasses[props.rounded || "md"],
        sizeClasses[props.size || "md"],
        props.fluid && "w-full",
        props.responsive && "w-full md:w-fit",
        variantClasses[props.variant || "accent"],
        props.disabled && "opacity-50 cursor-not-allowed",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
