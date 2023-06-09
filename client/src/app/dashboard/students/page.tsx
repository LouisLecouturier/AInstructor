import QuestionCube from "@/components/dashboard/Courses";
import { UserStore } from "@/store/userStore";
import React from "react";
import Link from "next/link";
import SuivantButton from "@components/button/SuivantButton";

const courses = [
  {
    date: "06/06",
    course: "ASN",
  },
  {
    date: "06/06",
    course: "Meca Q",
  },
  {
    date: "06/06",
    course: "Français",
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
    nom: "Broage",
    prenom: "Nicolas",
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
];

const Dashboard = () => {
  const firstname = UserStore.getState().firstname;

  return (
    <div className="flex gap-20">
      <div className="flex flex-col">
        <div>
          <h1 className={"flex items-center h-16 text-4xl font-black"}>
            Bon retour parmi nous {firstname} !
          </h1>
          <h2 className="flex items-center h-16 text-3xl">
            Reprendre mon parcours
          </h2>
        </div>
        <div className="flex gap-10">
          <div className="flex gap-10">
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
          </div>
          <div>
            <SuivantButton />
          </div>
        </div>
        <h2 className="flex items-center h-16 text-3xl">Mes formations</h2>
        <div className="flex flex-col gap-2 w-full">
          {homeworks.map((homework) => (
            <div className="flex flex-col gap-1 p-4 w-full bg-white rounded-xl">
              <h3 className="flex font-semibold">Devoir : {homework.course}</h3>
              <h3 className="flex font-semibold">Date : {homework.date}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-full bg-white rounded-xl">
        <div className="flex flex-col gap-4 py-5 p-4 w-full ">
          <h3 className="flex font-semibold px-10 text-4xl">Mon profil</h3>
          <h2 className="flex font-semibold px-5 text-3xl">Informations</h2>
          <div>
            {infos.map((info) => (
              <div className="flex flex-col gap-1 px-10 w-full">
                <h3 className="flex font-semibold">
                  <span className="font-black">Nom :&nbsp;</span>
                  {info.nom}
                </h3>
                <h3 className="flex font-semibold">
                  <span className="font-black">Prénom :&nbsp;</span>
                  {info.prenom}
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
