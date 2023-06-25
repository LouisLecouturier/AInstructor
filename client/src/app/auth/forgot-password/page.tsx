"use client";

import { signIn } from "next-auth/react";
import { useRef } from "react";
import { Button } from "@components/Layout/Interactions/Button";

import KeyIcon from "@icons/Key.svg";

import Input from "@components/Layout/Interactions/Forms/Input";

export default function ForgotPass() {
  async function onSubmit() {
    const res = await signIn("credentials", {
      username: username.current,
      redirect: true,
      callbackUrl: "/",
    });
  }

  const username = useRef(null);

  return (
    <>
      <div className="w-96 flex flex-col justify-center gap-5">
        <Input placeholder="Email" name={"email"} />
        <Button responsive className={"mt-4"} type={"submit"}>
          <span>Submit</span>
          <KeyIcon className={"w-5"} />
        </Button>
      </div>
    </>
  );
}
