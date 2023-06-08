"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {

  const {data : session} = useSession()

  console.log({session})

  return (
    <>
      <header>
          <h1 className={"flex items-center h-16 text-5xl font-black"}>Dashboard</h1>
      </header>
    </>
  );
}
