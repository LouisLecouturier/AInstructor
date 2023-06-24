"use client";

import React from "react";
import clsx from "clsx";

import Info from "@icons/Info.svg";
import Error from "@icons/Error.svg";
import Success from "@icons/Checkmark.svg";
import { toastStore, ToastTypes } from "@components/Layout/Toast/toast.store";

import styles from "./Toast.module.scss";

const computeContainerClassNames = (type: ToastTypes, show: boolean) =>
  clsx(
    "fixed right-8 bottom-8",
    "flex flex-col",
    "min-w-[16rem] w-fit h-fit",
    "text-white",
    typeClassNames[type],
    show ? "opacity-1" : "opacity-0 translate-y-full",
    "rounded-md",
    "overflow-hidden",
    "transition"
  );

const typeClassNames: Record<string, string> = {
  info: "bg-accent-400",
  success: "bg-green-500",
  error: "bg-secondary-500",
};

const gutterTypeClassNames: Record<string, string> = {
  info: "bg-accent-600",
  success: "bg-green-600",
  error: "bg-secondary-700",
};

const loaderTypeClassNames: Record<string, string> = {
  info: "bg-accent-200/60",
  success: "bg-green-200",
  error: "bg-secondary-300",
};

const computeLoaderBarClassNames = (type: ToastTypes, show: boolean) =>
  clsx(
    "h-full",
    "rounded-full",
    loaderTypeClassNames[type],
    show && styles["animateLoader"],
    "transition"
  );

const computeLoaderGutterClassNames = (type: ToastTypes) =>
  clsx("flex", "w-full h-2", gutterTypeClassNames[type]);

const iconClassName = clsx("w-7 h-7");

const getTypeIcon = (type?: string) => {
  switch (type) {
    case "info":
      return <Info className={iconClassName} />;
    case "success":
      return <Success className={iconClassName} />;
    case "error":
      return <Error className={iconClassName} />;
    default:
      return <Info className={iconClassName} />;
  }
};

const Toast = () => {
  const { type, title, show, setShow } = toastStore();

  return (
    <div className={computeContainerClassNames(type, show)}>
      <div className={"flex items-center gap-4 p-2"}>
        {getTypeIcon(type)}
        <div>
          <h2 className={"font-bold text-white pr-4"}>{title}</h2>
        </div>
      </div>
      <div className={computeLoaderGutterClassNames(type)}>
        <div
          onAnimationEnd={() => setShow(false)}
          className={computeLoaderBarClassNames(type, show)}
        ></div>
      </div>
    </div>
  );
};

export default Toast;
