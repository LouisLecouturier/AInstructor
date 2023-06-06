"use client";

import Index from "@components/Interactions/Forms/Input";
import { Button } from "@components/Interactions/Button";

import LoginIcon from "@icons/Login.svg";
import MyRadioGroup from "@components/Interactions/Forms/RadioGroup";

const options = [
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
];

function Register() {
  // function onSubmit() {
  //   const res = fetch("http://localhost:8000/api/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: "username.current",
  //       password: "password.current",
  //       email: "email.current",
  //       name: "Antoine Maes",
  //       phone: "+330606060606",
  //       type: "Student",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const status = data.status;
  //       console.log(status);
  //     })
  //     .catch((error) => {
  //       // Gérer les erreurs de la requête ici
  //       console.error(error);
  //     });
  // }

  return (
    <form
      className={"flex flex-col gap-4 max-w-[480px]"}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(
          Object.fromEntries(new FormData(e.currentTarget).entries())
        );
      }}
    >
      <MyRadioGroup
        defaultValue={options[0].value}
        options={options}
        name={"type"}
        label={"I'm a :"}
      />
      <Index placeholder="Full name" name={"name"} />
      <Index placeholder="Email" name={"email"} />
      <Index placeholder="Password" name={"password"} />
      <Index placeholder="Confirm password" name={"confirm_password"} />

      <Button responsive className={"mt-4"} type={"submit"}>
        <span>Sign Up</span>
        <LoginIcon className={"w-5"} />
      </Button>
    </form>
  );
}

export default Register;
