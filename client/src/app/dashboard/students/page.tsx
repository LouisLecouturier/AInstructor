"use client";
import QuestionCube from "@/components/dashboard/Courses";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const courses = [
  {
    date: "06/06",
    course: "ASN",
  },
  {
    date: "06/06",
    course: "Meca Q",
  },
];

const homeworks = [
  {
    date: "06/06",
    course: "Electronique",
  },
  {
    date: "06/06",
    course: "Physique",
  },
  {
    date: "06/06",
    course: "Maths",
  },
];

const infos = [
  {
    classe: "CSI 3",
    profref: "M. Lecouturier",
  },
];

const progress = [
  {
    course: "ASN",
    progress: 10,
  },
  {
    course: "Meca Q",
    progress: 51,
  },
  {
    course: "Français",
    progress: 93,
  },
  {
    course: "Maths",
    progress: 68,
  },
  {
    course: "Physique",
    progress: 100,
  },
];

const Dashboard = () => {
  const { data } = useSession();
  const firstname = data?.user.first_name;
  const lastname = data?.user.last_name;

  return (
    <div className="flex gap-40">
      <div className="flex flex-col">
        <div>
          <h1 className={"flex items-center h-16 text-4xl font-black"}>
            Bon retour parmi nous {firstname} !
          </h1>
          <h2 className="flex items-center h-16 text-3xl">
            Reprendre mon parcours
          </h2>
        </div>
        <div className="flex">
          <div className="flex gap-8">
            {courses.map((course, index) => (
              <QuestionCube
                key={course.course}
                index={index}
                course={course.course}
                date={course.date}
                progress={progress[index].progress}
                // image={course.image}
              />
            ))}
            <QuestionCube isSeeAll />
          </div>
        </div>
        <h2 className="flex items-center h-16 text-3xl">Mes formations</h2>
        <div className="flex flex-col gap-2 w-full">
          {homeworks.map((homework) => (
            <div className="flex flex-col gap-1 p-4 w-full bg-white rounded-xl hover:bg-accent-200">
              <h3 className="flex font-semibold">Devoir : {homework.course}</h3>
              <h3 className="flex font-semibold">Date : {homework.date}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-1/3 bg-white rounded-xl">
        <div className="flex flex-col gap-4 py-5 p-4 w-full ">
          <h3 className="flex font-semibold px-10 text-4xl">Mon profil</h3>
          <h2 className="flex font-semibold px-5 text-3xl">Informations</h2>
          <div>
            {infos.map((info) => (
              <div className="flex flex-col gap-1 px-10 w-full">
                <h3 className="flex font-semibold">
                  <span className="font-black">Nom :&nbsp;</span>
                  {lastname}
                </h3>
                <h3 className="flex font-semibold">
                  <span className="font-black">Prénom :&nbsp;</span>
                  {firstname}
                </h3>
                <h3 className="flex font-semibold">
                  <span className="font-black">Classe :&nbsp;</span>
                  {info.classe}
                </h3>
                <h3 className="flex font-semibold">
                  <span className="font-black">
                    Professeur référent :&nbsp;
                  </span>
                  {info.profref}
                </h3>
              </div>
            ))}
          </div>
          <h2 className="flex font-semibold px-5 text-3xl">Mon parcours</h2>
          <Link
            className="flex text-accent-500 text-md font-bold px-10"
            href="dashboard/students/stats"
          >
            Accéder à mes statistiques -{">"}
          </Link>
          <div className="flex flex-col gap-1 px-10 w-full">
            {progress.map((progress) => (
              <div className="flex flex-col gap-1 px-10 w-full">
                <h3 className="flex font-semibold">
                  <span className="font-black">{progress.course} :&nbsp;</span>
                  {progress.progress}%
                </h3>
              </div>
            ))}
          </div>
          <h2 className="flex font-semibold px-5 text-3xl">Contact</h2>
          <h1 className="flex font-semibold px-10">
            <span className="font-black">Mail contact : &nbsp;</span>{" "}
            prof@acad.me
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
