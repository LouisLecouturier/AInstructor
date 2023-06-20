"use client";

import React from "react";
import { Doughnut, Line, Radar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import Container from "@/components/layout/Container";

ChartJS.register(CategoryScale);


const data2 = {
  labels: ["Chap 1", "Chap 2", "Chap 3", "Chap 4"],
  datasets: [
    {
      label: "Score élève",
      /* IQ */
      data: [12, 52, 69, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        // "rgb(153, 102, 255)",
      ],
      hoverOffset: 4,
    },
  ],
};

const data3 = {
  labels: ["Chap 1", "Chap 2", "Chap 3", "Chap 4"],
  datasets: [
    {
      label: "Score élève",
      data: [12, 52, 69, 100],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
    {
      label: "Moyenne classe",
      data: [50, 32, 10, 80],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
  ],
};

const data4 = {
  labels: ["Chap 1", "Chap 2", "Chap 3", "Chap 4"],
  datasets: [
    {
      label: "Score élève",
      data: [12, 52, 69, 100],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};
// const config = {
//   type: "line",
//   data: data,
// };

export default function coursesStats() {
  return (
    <div className="flex flex-col gap-5 ">
      <header>
        <h1 className={"flex items-center h-16 text-5xl font-black"}>Stats</h1>
      </header>
      <div className="flex gap-10 items-center">
        <div className="flex flex-col gap-5">
          <div className="w-96 h-96">
            <Container className="w-96 h-96 border-2 border-dark-50 hover:border-accent-300 transition">
              <Radar data={data3} />
            </Container>
          </div>
          <div className="w-96 h-96">
            <Container className="w-96 h-96 border-2 border-dark-50 hover:border-accent-300 transition">
              <Doughnut data={data2} />
            </Container>
          </div>
        </div>
        <div className="flex flex-col w-full gap-10">
          <div className="w-full h-full">
            <Container
              title="Score de l'élève par cours"
              className="w-full h-full border-2 border-dark-50 hover:border-accent-300 transition"
              // description="c'est une belle courbe"
            >
              <Line data={data4} />
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
