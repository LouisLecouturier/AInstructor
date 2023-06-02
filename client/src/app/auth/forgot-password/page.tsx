"use client";

import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { Button } from "@components/Interactions/Button";

import KeyIcon from "@icons/Key.svg";

import Purple from "@blob/purple.svg";
import Yellow from "@blob/yellow.svg";
import Input from "@/components/Interactions/Forms/Input";

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
      <Purple className="fixed -left-1/4 -top-1/4 w-2/3 h-2/3" />
      <Yellow className="fixed -right-1/4 -bottom-1/4 w-2/3 h-2/3" />

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
