"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { Button } from "@components/Interactions/Button";
import LoginIcon from "@icons/Login.svg";

import Link from "next/link";
import Input from "@components/Interactions/Forms/Input";

function Login() {
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        username: email,
        password: password,
        redirect: true,
        callbackUrl: "http://localhost:3000/dashboard/teachers", // URL de redirection
      });

      if (result) {
        console.log(result);
      } else {
        // Success, handle redirection if needed
      }
    } catch (error) {
      setError("An error occurred during sign in.");
    }
  }

  return (
    <form className={"flex flex-col gap-4 max-w-[480px]"} onSubmit={onSubmit}>
      <div>
        <Input placeholder="Email" name="email" />
      </div>
      <div className={"flex flex-col gap-2 items-end"}>
        <Input placeholder="Password" name="password" />
        <Link
          href="/auth/forgot-password"
          className="text-accent-500 text-sm font-bold"
        >
          Forgot your password ?
        </Link>
      </div>

      <Button responsive className={"mt-4"} type={"submit"}>
        <span>Sign In</span>
        <LoginIcon className={"w-5"} />
      </Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default Login;
