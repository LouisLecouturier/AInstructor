"use client";

import { signIn } from "next-auth/react";
import Index from "@components/Interactions/Forms/Input";
import { FormEvent } from "react";
import { Button } from "@components/Interactions/Button";

import LoginIcon from "@icons/Login.svg";
import Link from "next/link";

function Login() {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <form className={"flex flex-col gap-4 max-w-[480px]"} onSubmit={onSubmit}>
      <div>
        <Index placeholder="Email" name="email" />
      </div>
      <div className={"flex flex-col gap-2 items-end"}>
        <Index placeholder="Password" name="password" />
        <Link
          href="auth/forgot-password"
          className="text-accent-500 text-sm font-bold"
        >
          Forgot your password ?
        </Link>
      </div>

      <Button responsive className={"mt-4"} type={"submit"}>
        <span>Sign In</span>
        <LoginIcon className={"w-5"} />
      </Button>
    </form>
  );
}

export default Login;
