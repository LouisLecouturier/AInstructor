import SortbyButton from "@/components/button/sortbybutton";
import React from "react";
import { useState } from "react";

const homeworks = [
  {
    name: "Homework 1",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "English - 4B",
    status: "Done",
  },
  {
    name: "Homework 2",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "English - 4B",
    status: "Done",
  },
  {
    name: "Homework 1",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "5g - French",
    status: "Done",
  },
  {
    name: "Conjugation - Present perfect",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "Mathematics",
    status: "Done",
  },
  {
    name: "Python - Function",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "English - 4B",
    status: "Done",
  },
];

function Homework({
  name,
  creationDate,
  deliveryDate,
  team,
  status,
}: {
  name: string;
  creationDate: string;
  deliveryDate: string;
  team: string;
  status: string;
}) {
  return (
    <div className="flex w-full py-6 bg-white shadow-md items-center justify-between px-10 gap-2 rounded-full ">
      <span className="font-semibold flex-[2] text-dark-500 text-lg">
        {name}
      </span>
      <div className="flex-1">
        <span className="text-dark-500 text-sm font-semibold">
          Creation date :{" "}
        </span>
        <span className="text-dark-500 text-xs">{creationDate}</span>
      </div>
      <div className="flex-1">
        <span className="text-dark-500 text-sm font-semibold">
          Delivery date :{" "}
        </span>
        <span className="text-dark-500 text-xs">{creationDate}</span>
      </div>
      <div className="flex-1">
        <span className="text-dark-500 text-sm font-semibold">Status : </span>
        <span className="text-dark-500 text-xs">{status}</span>
      </div>
    </div>
  );
}

function HomeworksList({
  homeworks,
}: {
  homeworks: {
    name: string;
    creationDate: string;
    deliveryDate: string;
    team: string;
    status: string;
  }[];
}) {
  let prevTeam = "";

  const homeworksList = homeworks
    .sort((a, b) => (a.team > b.team ? 1 : -1))
    .map((homework, i) => {
      const isDifferentTeam = homework.team != prevTeam;
      prevTeam = homework.team;

      if (isDifferentTeam) {
        return (
          <React.Fragment key={homework.team + "-" + i}>
            <span className="text-2xl pt-5 font-bold">{homework.team}</span>
            <Homework
              key={homework.name + "-" + i}
              name={homework.name}
              creationDate={homework.creationDate}
              deliveryDate={homework.deliveryDate}
              team={homework.team}
              status={homework.status}
            />
          </React.Fragment>
        );
      } else {
        return (
          <Homework
            key={homework.name + "-" + i}
            name={homework.name}
            creationDate={homework.creationDate}
            deliveryDate={homework.deliveryDate}
            team={homework.team}
            status={homework.status}
          />
        );
      }
    });
  return (
    <div className="flex flex-1 overflow-hidden w-full flex-col">
      <div className="flex w-full h-1">
        <div className="flex-1 bg-dark-400 h-1 rounded-full" />
      </div>
      <div className="flex flex-col pb-16 gap-5 overflow-auto">
        {homeworksList}
      </div>
    </div>
  );
}

export default function Homeworks() {
  return (
    <div className="flex-1 h-full flex gap-6 flex-col">
      <h1 className="text-6xl font-black">Homeworks</h1>
      <SortbyButton />
      <HomeworksList homeworks={homeworks} />
    </div>
  );
}
