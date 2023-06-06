"use client";

import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

const data = {
  labels: [
    "Maths",
    "English",
    "French",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
  ],
  datasets: [
    {
      label: "Average",
      data: [12, 19, 3, 5, 2, 3, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(201, 203, 207, 0.7)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
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
  labels: ["IQ Nico", "IQ Antoine", "IQ Louis", "IQ Maël", "IQ Jules"],
  datasets: [
    {
      label: "IQ AInstructor",
      /* IQ */
      data: [90, 80, 70, 100, 120],
      backgroundColor: [
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

const Stats = () => {
  return (
    <>
      <header>
        <h1 className={"flex items-center h-16 text-4xl font-black"}>Stats</h1>
      </header>
      <div className="w-96 h-96 flex gap-40">
        <Bar data={data} options={options} />
        <Doughnut data={data2} />
      </div>
      <div className="flex gap-40 w-96 h-96 ">
        <Line data={data} options={options} />
        <Pie data={data} />
      </div>
    </>
  );
};

export default Stats;
