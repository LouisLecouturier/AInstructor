"use client";

import React, { FC, ReactNode } from "react";
import clsx from "clsx";
import BreadCrumbs from "@components/Dashboard/Common/Layout/BreadCrumbs";

type ReplaceItem = {
  current: number;
  value: string;
};

type HeaderProps = {
  title: string;
  children?: ReactNode;
  className?: string;
  breadcrumbsReplace?: ReplaceItem[];
};



const Header: FC<HeaderProps> = (props) => {
  return (
    <header className={clsx("flex gap-2 mb-16", props.className)}>
      <div className={"flex flex-col gap-4"}>
        <h1 className={"text-5xl font-black text-dark-500"}>{props.title}</h1>
        <BreadCrumbs replace={props.breadcrumbsReplace}/>
      </div>
      {props.children}
    </header>
  );
};

export default Header;
