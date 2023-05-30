'use client'
import React from "react";
import Header from "@components/landing/navigation/Header";
import Background from "@components/layout/Background";
import clsx from "clsx";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <Background className={"h-screen"}>
      <Header />
      <section
        className={clsx(
          "flex flex-col md:grid gap-8 sm:gap-12",
          "h-full",
          "px-8 md:px-16 lg:px-24",
          "pt-[136px] pb-8",
          styles["grid-template"]
        )}
      >
        <div className={"flex items-center h-full col-span-2 self-end"}>
          <h1
            className={
              "w-full md:w-3/4 lg:w-1/2 text-4xl sm:text-5xl md:text-6xl font-black leading-[3rem] sm:leading-[4rem] lg:leading-[5rem]"
            }
          >
            Take your learning skills to the{" "}
            <span className={"text-primary-500 italic leading-[3rem] sm:leading-[4rem]"}>Next </span>
            level.
          </h1>
        </div>
        <button
          className={clsx(
            "col-start-1 col-end-2 row-start-2 row-end-4 ",
            "w-fit py-4 px-8 self-start bg-accent-500",
            "text-lg font-bold text-white rounded-full"
          )}
        >
          See plans
        </button>
        <div
          className={clsx(
            "row-start-3 row-end-4 flex flex-col gap-8 flex-1  self-end justify-self-end",
            "w-full h-fit max-w-md",
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
          <button
            className={clsx(
              "w-fit py-3 px-6 self-start bg-accent-500",
              "font-bold text-white rounded-full"
            )}
          >
            Tell me more
          </button>
        </div>
      </section>
    </Background>
  );
};

export default Home;

