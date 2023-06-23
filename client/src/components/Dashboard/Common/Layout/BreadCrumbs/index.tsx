"use client";

import React, { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import Arrow from "@icons/Arrow.svg";

type ReplaceItem = {
  current: string;
  value: string;
};

type BreadCrumbsProps = {
  replace?: ReplaceItem[];
};

const BreadCrumbs: FC<BreadCrumbsProps> = (props) => {
  const realpath = String(usePathname()).split("/");

  let path = [...realpath];

  if (props.replace) {
    props.replace.forEach((item) => {
      path[path.indexOf(String(item.current))] = item.value;
    });
  }

  if (path.slice(3).length < 2) {
    return <></>;
  }

  return (
    <nav className={"flex items-center"}>
      {path.slice(3).map((page, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-center",
            "font-medium leading-none text-dark-300"
          )}
        >
          <Link
            href={`${realpath
              .join("/")
              .slice(0, realpath.join("/").indexOf(page) + page.length + 1)}`}
            key={index}
            className={clsx(
              "p-1.5 px-2.5",
              index === 0 && "pl-0 hover:pl-2.5",
              "rounded-sm",
              index === path.slice(3).length - 1 &&
                "font-bold text-accent-500 bg-accent-500/5 ml-2",
              "capitalize",
              "hover:text-accent-500 hover:bg-accent-500/5",
              "transition-all"
            )}
          >
            {page}
          </Link>
          {index !== path.slice(3).length - 1 && <Arrow className={"w-4 h-4"} />}
        </div>
      ))}
    </nav>
  );
};

export default BreadCrumbs;
