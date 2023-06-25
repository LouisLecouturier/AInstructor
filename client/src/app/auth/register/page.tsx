"use client";

import Input from "@components/Layout/Interactions/Forms/Input";
import { Button } from "@components/Layout/Interactions/Button";

import LoginIcon from "@icons/Login.svg";
import MyRadioGroup from "@components/Layout/Interactions/Forms/RadioGroup";
import { FormEvent, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toastStore } from "@components/Layout/Toast/toast.store";
import { useRouter } from "next/navigation";

function checkPassword(password: string) {
  // Vérifie la longueur du mot de passe
  if (password.length < 8) {
    return false;
  }

  // Vérifie la présence d'au moins un chiffre
  if (!/\d/.test(password)) {
    return false;
  }

  // Vérifie la présence d'au moins une lettre en minuscule et en majuscule
  if (!/[a-z]/i.test(password)) {
    return false;
  }

  // Vérifie la présence d'au moins un caractère spécial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return false;
  }

  // Si toutes les conditions sont satisfaites, le mot de passe est robuste
  return true;
}

const options = [
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
];

function Register() {
  const openToast = toastStore((state) => state.openToast);

  const {data: session} = useSession()
  const router = useRouter();


  useEffect(() => {
    if (!!session?.user.accessToken) {
      openToast("success", "Logged in");
      router.push(
        `/dashboard/${session?.user.isTeacher ? "teachers" : "students"}`
      );
    }
  }, [session]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm_password = formData.get("confirm_password") as string;
    const first_name = formData.get("firstname") as string;
    const last_name = formData.get("lastname") as string;
    const isTeacher = formData.get("type") === "teacher";

    if (password !== confirm_password) {
      openToast("error", "Passwords don't match");
      return;
    }

    if (checkPassword(password) == false) {
      openToast(
        "error",
        "Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter and one special character"
      );
      return;
    }

    fetch("http://localhost:8000/api/register", {
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
    })
      .then(async (response) => {
        if (response.ok) {
          openToast("success", "Account created");
          await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
        }
      })
      .catch((error) => {
        // Gérer les erreurs de la requête ici
        openToast("error", "Something went wrong");
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
      <Input placeholder="Password" type={"password"} name={"password"} />
      <Input
        placeholder="Confirm password"
        type={"password"}
        name={"confirm_password"}
      />

      <Button responsive className={"mt-4"} type={"submit"}>
        <span>Sign Up</span>
        <LoginIcon className={"w-5"} />
      </Button>
    </form>
  );
}

export default Register;
