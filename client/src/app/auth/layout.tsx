"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";
import Background from "@components/layout/Background";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Aside = (props: { isLoggingIn?: boolean }) => {
  return (
    <aside
      className={clsx(
        "flex flex-col justify-center items-center gap-8 order-2 md:order-first",
<<<<<<< HEAD
        "w-full md:w-2/5 md:p-8 font-medium"
=======
        "w-full md:w-2/5 max-w-md md:p-8 font-medium"
>>>>>>> origin/FullStack
      )}
    >
      <span className={"hidden md:flex text-5xl font-black"}>AInstructor</span>

      <div className={"flex flex-col items-center gap-1"}>
        <span>
          {props.isLoggingIn
            ? "Don't have an account yet ?"
            : "Already have an account ?"}
        </span>
        <Link
          href={`/auth${props.isLoggingIn ? "/register" : "/login"}`}
          className={"font-bold text-accent-500 underline"}
        >
          {props.isLoggingIn ? "Create one" : "Sign in"}
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
<<<<<<< HEAD
  const isSigningIn = pathname?.includes("signin") || false;
<<<<<<< HEAD

  return (
=======
=======
  const isLoggingIn = pathname?.includes("login") || false;
>>>>>>> origin/FullStack
  const isForgotPassword = pathname?.includes("forgot-password") || false;

  let description: string;
  let headingContent: ReactNode;

  if (isForgotPassword) {
    description =
      "Enter the email associated with your account and we'll send an email with instructions to reset your password.";
    headingContent = (
      <span>
        Forgot your <span className={"whitespace-nowrap"}>password ?</span>
      </span>
    );
  } else if (!isForgotPassword && isLoggingIn) {
    description = "Signin to your account";
    headingContent = (
      <span>
        Welcome <span className={"whitespace-nowrap"}>back !</span>
      </span>
    );
  } else {
    description = "Create your account";
    headingContent = (
      <span>
        Nice to meet <span className="whitespace-nowrap">you !</span>
      </span>
    );
  }

  return (
<<<<<<< HEAD

>>>>>>> origin/FullStack
=======
>>>>>>> origin/FullStack
    <div
      className={
        "flex flex-col md:flex-row p-6 gap-6 w-screen min-h-screen bg-white"
      }
    >
      <span className={"flex md:hidden py-2 text-4xl font-black"}>
        AInstructor
      </span>
<<<<<<< HEAD
      <Aside isSigningIn={isSigningIn} />
<<<<<<< HEAD
      <Background rounded>
        <div className="flex flex-col justify-center gap-12 h-full p-8 sm:p-12 lg:p-24">
          <header className={"flex flex-col gap-2"}>
            <h1 className="text-5xl font-black">
              {isSigningIn ? "Welcome back !" : "Nice to meet you !"}
            </h1>
            <span className={"font-semibold opacity-50"}>
              {isSigningIn ? "Sign in to your account" : "Create your account"}
=======
=======
      <Aside isLoggingIn={isLoggingIn} />
>>>>>>> origin/FullStack
      <Background rounded className={"flex flex-1 items-center"}>
        <div className="flex flex-col justify-center gap-12 h-full p-8 sm:p-12 lg:p-24">
          <header className={"flex flex-col gap-2"}>
            <h1 className="text-4xl md:text-5xl font-black">
              {headingContent}
            </h1>
<<<<<<< HEAD
            <span className={"font-semibold opacity-50"}>
              {description}
>>>>>>> origin/FullStack
            </span>
=======
            <span className={"font-semibold opacity-50"}>{description}</span>
>>>>>>> origin/FullStack
          </header>
          {props.children}
        </div>
<<<<<<< HEAD

=======
>>>>>>> origin/FullStack
      </Background>
    </div>
  );
}
