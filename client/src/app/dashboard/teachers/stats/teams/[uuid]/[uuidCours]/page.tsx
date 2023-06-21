"use client";

import { Bar, Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import Container from "@/components/layout/Container";
import Header from "@/components/dashboard/Layout/Header";

const data = {
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
    },
  ],
};

const options = {
  maintainAspectRatio: false,
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
    <div className="flex h-full flex-col gap-10">
      <Header title="Stats" />
      <div className="flex flex-col flex-1 gap-10 items-center">
        <div className="h-full w-full flex gap-10 justify-center flex-wrap pb-12">
          <Container className="max-w-[700px] max-h-[400px] w-full flex-1 border-2 border-white hover:border-accent-300 transition flex justify-center items-center">
            <Bar data={data} options={options} />
          </Container>
          <Container className="max-w-[700px] max-h-[400px] w-full flex-1 border-2 border-white hover:border-accent-300 transition flex justify-center items-center">
            <Doughnut data={data2} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default teamStats;
