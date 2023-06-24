"use client";

import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect } from "react";
import { Button } from "@components/Layout/Interactions/Button";
import LoginIcon from "@icons/Login.svg";

import Link from "next/link";
import Input from "@components/Layout/Interactions/Forms/Input";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { toastStore } from "@components/Layout/Toast/toast.store";

function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const openToast = toastStore((state) => state.openToast);

  useEffect(() => {
    if (!!session?.user.accessToken) {
      openToast("success", "Logged in");
      router.push(
        `/dashboard/${session?.user.isTeacher ? "teachers" : "students"}`
      );
    }
  }, [session]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    signIn("credentials", {
      email,
      password,
    })
      .then(() => {
        openToast("success", "Logged in");
      })
      .catch(() => {
        openToast("error", "An error occurred during sign in.");
      });
  }

  return (
    <form className={"flex flex-col gap-4 max-w-[480px]"} onSubmit={onSubmit}>
      <div>
        <Input
          placeholder="Email"
          name="email"
          className={clsx(
            !!session?.user.message
              ? session?.user.message == "Authentification successful"
                ? "border-green-500 border-2"
                : "border-secondary-500 border-2"
              : null
          )}
        />
      </div>
      <div className={"flex flex-col gap-2 items-end"}>
        <Input
          placeholder="Password"
          type={"password"}
          name="password"
          className={clsx(
            !!session?.user.message
              ? session?.user.message == "Authentification successful"
                ? "border-green-500 border-2"
                : "border-secondary-500 border-2"
              : null
          )}
        />
        <div className="flex flex-row justify-between w-full">
          {session?.user.message == "Authentification successful" ? (
            <span className="text-green-500 font-semibold">
              {session?.user.message}
            </span>
          ) : (
            <span className="text-secondary-500 font-semibold">
              {session?.user.message}
            </span>
          )}

          <Link
            href="/auth/forgot-password"
            className="text-accent-500 text-sm font-bold"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <Button responsive className={"mt-4"} type={"submit"}>
        <span>Sign In</span>
        <LoginIcon className={"w-5"} />
      </Button>
    </form>
  );
}

export default Login;
