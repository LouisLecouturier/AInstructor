"use client";

import Input from "@components/Interactions/Forms/Input";
import { Button } from "@components/Interactions/Button";

import LoginIcon from "@icons/Login.svg";
import MyRadioGroup from "@components/Interactions/Forms/RadioGroup";
import { FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";

const options = [
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
];

function Register() {
  const { data: session } = useSession();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const first_name = formData.get("firstname") as string;
    const last_name = formData.get("lastname") as string;
    const isTeacher = formData.get("type") === "teacher";

    await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
        first_name,
        last_name,
        isTeacher,
      }),
    }).then((response) => {
      if (response.ok) {
        signIn();
      }
    })
      .catch((error) => {
        // Gérer les erreurs de la requête ici
        console.error(error);
      });
  }

  return (
    <form
      className={"flex flex-col gap-4 max-w-[480px]"}
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <MyRadioGroup
        defaultValue={options[0].value}
        options={options}
        name={"type"}
        label={"I'm a :"}
      />
      <Input placeholder="Firstname" name={"firstname"} />
      <Input placeholder="Lastname" name={"lastname"} />
      <Input placeholder="Email" name={"email"} />
      <Input placeholder="Password" name={"password"} />
      <Input placeholder="Confirm password" name={"confirm_password"} />

      <Button responsive className={"mt-4"} type={"submit"}>
        <span>Sign Up</span>
        <LoginIcon className={"w-5"} />
      </Button>
    </form>
  );
}

export default Register;
