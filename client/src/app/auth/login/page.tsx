"use client";

import { signIn, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Button } from "@components/Interactions/Button";
import LoginIcon from "@icons/Login.svg";

import Link from "next/link";
import Input from "@components/Interactions/Forms/Input";
import { useRouter } from "next/navigation";

function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      return;
    }

    if (!session) return;

    router.push(`/dashboard/${session.user.isTeacher ? "teachers" : "students"}`);
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
