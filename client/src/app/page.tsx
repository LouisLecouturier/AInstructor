"use client"
import React from "react";
import Header from "@components/Pages/landing/navigation/Header";
import Background from "@components/layout/Background";
import clsx from "clsx";

import styles from "./Home.module.scss";
import {Button} from "@components/Interactions/Button";
import { useSession } from "next-auth/react";

const Home = () => {

  const {data : session} = useSession()

  console.log({session})

  return (
    <Background className={"h-screen"}>
      <Header />
      <section
        className={clsx(
          "flex flex-wrap gap-8 sm:gap-12 items-center lg:justify-between",
          "h-full",
          "px-8 md:px-16 lg:px-24",
          "pt-[136px] pb-8"
        )}
      >
        <div
          className={
            "flex flex-col w-full flex-1 gap-16 justify-self-center sm:min-w-[32rem]"
          }
        >
          <h1
            className={
              "w-full md:w-4/5 text-4xl sm:text-5xl md:text-6xl font-black leading-[3rem] sm:leading-[4rem] lg:leading-[5rem]"
            }
          >
            Take your learning skills to the{" "}
            <span
              className={
                "text-primary-500 italic leading-[3rem] sm:leading-[4rem]"
              }
            >
              Next{" "}
            </span>
            level.
          </h1>
          {session?.user ? (
            <Button size={"lg"} rounded={"full"}>
              See plans {session.user?.first_name}
            </Button>
          ) : (
            <Button size={"lg"} rounded={"full"}>
              See plans
            </Button>
          )}
        </div>
        <div
          className={clsx(
            "flex self-end justify-self-end flex-col gap-8",
            "h-fit max-w-md",
            "bg-white rounded-3xl p-6 sm:p-8",
            "font-semibold"
          )}
        >
          <p className={"text-xl"}>
            Experience the{" "}
            <strong className={"font-semibold text-accent-500"}>
              next generation
            </strong>{" "}
            learning methods using the power of technology and{" "}
            <strong className={"font-semibold text-accent-500"}>
              generative AI
            </strong>
            .
          </p>
          <Button rounded={"full"} >Learn more</Button>

        </div>
      </section>
    </Background>
  );
};

export default Home;
