"use client";
import QuestionCube from "@components/Dashboard/Courses";

import React from "react";
import { useSession } from "next-auth/react";
import Header from "@components/Dashboard/Layout/Header";
import ListItem from "@components/Layout/ListItem";

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
    creationDate: "06/06/2023",
    deliveryDate: "06/06/2023",
    course: "Electronique",
  },
  {
    creationDate: "06/06/2023",
    deliveryDate: "06/06/2023",
    course: "Physique",
  },
  {
    creationDate: "06/06/2023",
    deliveryDate: "06/06/2023",
    course: "Maths",
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

  return (
    <div className="flex flex-1 w-full flex-col">
      <Header title={"Dashboard"}/>
      <div className="flex-col flex gap-8">
        <h1 className="text-4xl font-bold">
          Bon retour parmi nous {firstname} !
        </h1>

        <div className="flex flex-col gap-2">
          <h2 className="flex items-center h-16 text-3xl">
            Reprendre mon parcours
          </h2>
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

        <div className="flex flex-col gap-2">
          <h2 className="flex items-center h-16 text-3xl">Mes formations</h2>
          <div className="flex flex-col gap-2 w-full">


            {homeworks.map((homework: any) => {
              const properties = [
                { label: "Creation date", value: homework.creationDate },
                { label: "Delivery date", value: homework.deliveryDate },
              ];

              return (
                <ListItem
                  href={"/dashboard/students/courses/1"}
                  key={homework.name}
                  properties={properties}
                >
                  {homework.course}
                </ListItem>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* <div className="flex w-1/3 bg-white rounded-xl">
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
      </div> */