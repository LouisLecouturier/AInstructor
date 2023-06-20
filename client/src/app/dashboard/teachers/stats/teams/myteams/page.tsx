"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import Container from "@/components/layout/Container";

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
        <h1 className="flex items-center h-16 text-5xl font-black">
          Stats de mes teams
        </h1>
      </header>
      <div className="flex gap-40 items-center">
        <Container className="w-1/2 h-1/2 border-2 border-dark-50 hover:border-accent-300 transition">
          <Bar data={data} options={options} />
        </Container>
      </div>
      <Container className="w-full h-1/2 border-2 border-dark-50 hover:border-accent-300 transition text-center">
        <div className="flex flex-col gap-5">
          <h1 className="flex font-black text-4xl">Quelques chiffres</h1>
          <div className="flex gap-40 text-center">
            <div className="flex flex-col gap-5">
              <h1>Nombre d&apos;équipe : </h1>
              <h1>Nombre d&apos;élève : </h1>
            </div>
            <div className="flex flex-col gap-5">
              <h1>Score le plus élevé : </h1>
              <h1>Score le plus bas : </h1>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
