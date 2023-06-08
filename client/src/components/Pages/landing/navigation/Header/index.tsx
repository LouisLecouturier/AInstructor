"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import clsx from "clsx";

import LoginIcon from "@icons/User.svg";
import { signIn } from "next-auth/react";

const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className={"fixed inset-0 w-full h-fit p-8 md:px-12 lg:px-20 font-bold"}>
      <header
        className={
          "flex justify-between items-center gap-8 p-2 pl-8 bg-white rounded-full"
        }
      >
        <Link className="text-lg" href={"/"}>
          AInstructor
        </Link>

        <nav className={clsx("flex gap-6 items-center", styles["header-nav"])}>
          <Link
            className={clsx(styles["link"], isActive("/") && styles["active"])}
            href={"/"}
          >
            Home
          </Link>
          <Link
            className={clsx(
              styles["link"],
              isActive("/solutions") && styles["active"]
            )}
            href={"/solutions"}
          >
            Our solution
          </Link>
          <Link
            className={clsx(
              styles["link"],
              isActive("/active") && styles["active"]
            )}
            href={"/pricing"}
          >
            Pricing
          </Link>

          <div className={clsx(
              "flex justify-center",
              "w-14 h-14 rounded-full",
              "bg-accent-500 text-white",
              "hover:bg-accent-600",
              "transition"
              )}
              onClick={() => signIn()}
            
          >
            <LoginIcon className={"w-2/3"} />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
