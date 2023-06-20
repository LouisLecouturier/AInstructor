// "use client";

// import { signIn, useSession } from "next-auth/react";
// import { FormEvent, useState } from "react";
// import { Button } from "@components/Interactions/Button";
// import LoginIcon from "@icons/Login.svg";

// import Link from "next/link";
// import Input from "@components/Interactions/Forms/Input";
// import { useRouter } from "next/navigation";

// function Login() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [error, setError] = useState("");

//   if (session) {
//     const { user } = session;
//     router.push(`/dashboard/${user.isTeacher ? "teachers" : "students"}`);
//   }

//   async function onSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     signIn("credentials", {
//       email,
//       password,
//     })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         // Gérer les erreurs de la requête ici
//         console.error(error);
//         setError("An error occurred during sign in.");
//       });

//   }

//   return (
//     <form className={"flex flex-col gap-4 max-w-[480px]"} onSubmit={onSubmit}>
//       <div>

//         <Input placeholder="Email" name="email" />
//       </div>
//       <div className={"flex flex-col gap-2 items-end"}>
//         <Input placeholder="Password" name="password" />
//         <Link
//           href="/auth/forgot-password"
//           className="text-accent-500 text-sm font-bold"
//         >
//           Forgot your password ?
//         </Link>
//       </div>

//       <Button responsive className={"mt-4"} type={"submit"}>
//         <span>Sign In</span>
//         <LoginIcon className={"w-5"} />
//       </Button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}

//     </form>
//   );
// }

// export default Login;

"use client"

import { signIn, useSession } from "next-auth/react";
import { FormEvent, useState, useEffect } from "react";
import { Button } from "@components/Interactions/Button";
import LoginIcon from "@icons/Login.svg";

import Link from "next/link";
import Input from "@components/Interactions/Forms/Input";
import { useRouter } from "next/navigation";
import clsx from "clsx";

function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(session);
    if (!!session?.user.accessToken) {
      console.log("redirecting");
      router.push(`/dashboard/${session?.user.isTeacher ? "teachers" : "students"}`);
    }
  }, [session, router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    signIn("credentials", {
      email,
      password,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred during sign in.");
      });
  }

  return (
    <form className={"flex flex-col gap-4 max-w-[480px]"} onSubmit={onSubmit}>
      <div>
        <Input placeholder="Email" name="email" className={clsx(!!session?.user.message ? (session?.user.message == "Authentification successfull" ? "border-green-500 border-2" : "border-secondary-500 border-2") : null)} />
      </div>
      <div className={"flex flex-col gap-2 items-end"}>
        <Input placeholder="Password" name="password" className={clsx(!!session?.user.message ? (session?.user.message == "Authentification successfull" ? "border-green-500 border-2" : "border-secondary-500 border-2") : null)} />
        <div className="flex flex-row justify-between w-full">

          {session?.user.message == "Authentification successfull" 
            ?
            <span className="text-green-500">
              {session?.user.message}
            </span>

            :
            <span className="text-secondary-500">
              {session?.user.message}
            </span>

          }

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
