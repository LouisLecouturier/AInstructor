"use client";

import React from "react";
import { Bar, Line, Doughnut, Pie, Radar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import Container from "@/components/layout/Container";

const teams = [
  {
    id: 1,
    name: "Groupe 1",
    score: 12,
    moy: 50,
    effectif: 12,
  },
  {
    id: 2,
    name: "Groupe 2",
    score: 52,
    moy: 32,
    effectif: 12,
  },
  {
    id: 3,
    name: "Groupe 3",
    score: 69,
    moy: 10,
    effectif: 12,
  },
];

const data = {
  labels: ["Groupe 1", "Groupe 2", "Groupe 3"],
  datasets: [
    {
      label: "Moyenne par team",
      data: [12, 52, 69, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  lineTension: 0.3,
};

ChartJS.register(CategoryScale);

export default function myTeams() {
  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className={"flex items-center h-16 text-5xl font-black"}>
          Stats de mes teams
        </h1>
      </header>
      <div className="flex gap-40">
        <Container className="w-1/2 h-1/2 border-2 border-dark-50 hover:border-accent-300 transition">
          <Bar data={data} options={options} />
        </Container>
      </div>
    </div>
  );
}
