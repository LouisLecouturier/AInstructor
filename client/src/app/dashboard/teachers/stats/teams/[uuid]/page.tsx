"use client";

import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import Container from "@/components/layout/Container";
import { useEffect, useRef, useCallback } from "react";
import { registerables } from "chart.js";

const data = {
  labels: [
    /*effectif : 12*/
    "Elève 1",
    "Elève 2",
    "Elève 3",
    "Elève 4",
    "Elève 5",
    "Elève 6",
    "Elève 7",
    "Elève 8",
    "Elève 9",
    "Elève 10",
    "Elève 11",
    "Elève 12",
  ],
  datasets: [
    {
      label: "Average",
      data: [12, 19, 3, 5, 2, 3, 15, 3, 5, 2, 3, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(201, 203, 207, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  lineTension: 0.3,
};

const data2 = {
  labels: [
    "Elève 1",
    "Elève 2",
    "Elève 3",
    "Elève 4",
    "Elève 5",
    "Elève 6",
    "Elève 7",
    "Elève 8",
    "Elève 9",
    "Elève 10",
    "Elève 11",
    "Elève 12",
  ],
  datasets: [
    {
      label: "Score élèves",
      /* IQ */
      data: [12, 19, 3, 5, 2, 3, 15, 3, 5, 2, 3, 15],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(153, 102, 255)",
        "rgb(255, 159, 64)",
        "rgb(201, 203, 207)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(153, 102, 255)",
      ],
      hoverOffset: 4,
    },
  ],
};

ChartJS.register(CategoryScale);

const teamStats = () => {
  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className={"flex items-center h-16 text-5xl font-black"}>Stats</h1>
      </header>
      <div className="flex flex-col w-full h-full gap-10 items-center">
        <div className="max-w max-h flex gap-40 items-center">
          <Container className="h-full w-full border-2 border-dark-50 hover:border-accent-300 transition">
            <Bar data={data} options={options} />
          </Container>
          <Container className="h-full w-full border-2 border-dark-50 hover:border-accent-300 transition">
            <Doughnut data={data2} />
          </Container>
        </div>
        {/* <div className="flex gap-40 max-w max-h ">
          <Container className="h-full w-full border-2 border-dark-50 hover:border-accent-300 transition">
            <Line data={data} options={options} />
          </Container>
          <Container className="h-full w-full border-2 border-dark-50 hover:border-accent-300 transition">
            <Pie data={data} />
          </Container>
        </div> */}
      </div>
    </div>
  );
};

export default teamStats;
