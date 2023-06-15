"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  router.push("/login");
};

export default Auth;
