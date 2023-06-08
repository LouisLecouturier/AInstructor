"use client"

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { Button } from "@components/Interactions/Button";
import LoginIcon from "@icons/Login.svg";
import Input from "@/components/Interactions/Forms/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        username: email,
        password: password,
        redirect: true,
        callbackUrl: "http://localhost:3000/dashboard/teachers", // URL de redirection

      });

      if (result) {
        console.log(result)
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
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={"flex flex-col gap-2 items-end"}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <a href="#" className="text-accent-500 text-sm font-bold">
          Forgot your password ?
        </a>
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
