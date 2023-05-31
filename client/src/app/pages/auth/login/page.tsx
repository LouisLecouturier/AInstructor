"use client";

import { signIn } from "next-auth/react";
import Input from "@components/form/input";
import { useRef } from "react";
import Background from "@components/layout/Background";
import clsx from "clsx";
import { Button } from "@components/layout/Button";

import LoginIcon from "@icons/Login.svg";

export default function Login() {
  async function onSubmit() {
    const res = await signIn("credentials", {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/",
    });
  }

  const username = useRef(null);
  const password = useRef(null);

  return (
    <div
      className={
        "flex flex-col md:flex-row p-6 gap-6 w-screen h-screen bg-white"
      }
    >
      <span className={"flex md:hidden py-2 text-4xl font-black"}>
        AInstructor
      </span>
      <aside
        className={clsx(
          "flex flex-col justify-center items-center gap-8 order-2 md:order-first",
          "w-full md:w-2/5 p-4 md:p-8 font-medium"
        )}
      >
        <span className={"hidden md:flex text-5xl font-black"}>
          AInstructor
        </span>

        <div className={"flex flex-col items-center gap-1"}>
          <span>Don&apos;t have an account yet ?</span>
          <a href="#" className={"font-bold text-accent-500 underline"}>
            Create one
          </a>
        </div>
      </aside>
      <Background rounded>
        <div className="flex flex-col justify-center gap-12 h-full w-full p-8 sm:px-12 lg:px-24">
          <header className={"flex flex-col gap-2"}>
            <h1 className="text-5xl font-black">Welcome back !</h1>
            <span className={"font-semibold opacity-50"}>
              Sign in to your account
            </span>
          </header>
          <form className={"flex flex-col gap-4 max-w-[480px]"}>
            <div>
              <Input placeholder="Email" content={username} />
            </div>
            <div className={"flex flex-col gap-2 items-end"}>
              <Input placeholder="Password" content={password} />
              <a href="#" className="text-accent-500 text-sm font-bold">
                Forgot your password ?
              </a>
            </div>

            <Button responsive className={"mt-4"} onClick={onSubmit}>
              <span>Login</span>
              <LoginIcon className={"w-5"} />
            </Button>
          </form>
        </div>

        <div className="h-full w-full z-0 relative top-0 left-0 flex justify-center items-center">
          <div className="w-2/5 h-4/6 bg-white flex flex-col rounded-lg p-10">
            <h1 className="text-xl font-light">Sign in to your accounts</h1>

            <div className="w-full h-full flex flex-col justify-center items-start gap-5">
              <div className="w-full flex justify-end"></div>
            </div>
          </div>
        </div>
      </Background>
    </div>
  );
}
