"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";
import Background from "@components/layout/Background";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Aside = (props: { isSigningIn?: boolean }) => {
  return (
    <aside
      className={clsx(
        "flex flex-col justify-center items-center gap-8 order-2 md:order-first",
        "w-full md:w-2/5 max-w-md md:p-8 font-medium"
      )}
    >
      <span className={"hidden md:flex text-5xl font-black"}>AInstructor</span>

      <div className={"flex flex-col items-center gap-1"}>
        <span>
          {props.isSigningIn
            ? "Don't have an account yet ?"
            : "Already have an account ?"}
        </span>
        <Link
          href={`/auth${props.isSigningIn ? "/signup" : "/signin"}`}
          className={"font-bold text-accent-500 underline"}
        >
          {props.isSigningIn ? "Create one" : "Sign in"}
        </Link>
      </div>
    </aside>
  );
};

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const pathname = usePathname();
  const isSigningIn = pathname?.includes("signin") || false;

  return (
    <div
      className={
        "flex flex-col md:flex-row p-6 gap-6 w-screen min-h-screen bg-white"
      }
    >
      <span className={"flex md:hidden py-2 text-4xl font-black"}>
        AInstructor
      </span>
      <Aside isSigningIn={isSigningIn} />
      <Background rounded className={"flex flex-1 items-center"}>
        <div className="flex flex-col justify-center gap-12 h-full p-8 sm:p-12 lg:p-24">
          <header className={"flex flex-col gap-2"}>
            <h1 className="text-4xl md:text-5xl font-black">
              {isSigningIn ? (
                <span>
                  Welcome <span className={"whitespace-nowrap"}>back !</span>
                </span>
              ) : (
                <span>
                  Nice to meet <span className="whitespace-nowrap">you !</span>
                </span>
              )}
            </h1>
            <span className={"font-semibold opacity-50"}>
              {isSigningIn ? "Sign in to your account" : "Create your account"}
            </span>
          </header>
          {props.children}
        </div>
      </Background>
    </div>
  );
}