"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import Container from "@components/Layout/Container";
import Header from "@components/Dashboard/Common/Layout/Header";

Chart.register(...registerables);

const courses = [
  {
    id: 1,
    course: "ASN",
    score: 12,
  },
  {
    id: 2,
    course: "Meca Q",
    score: 52,
  },
  {
    id: 3,
    course: "Electronique",
    score: 69,
  },
  {
    id: 4,
    course: "Physique",
    score: 100,
  },
];

const moyenne = [
  {
    id: 1,
    moy: 50,
  },
  {
    id: 2,
    moy: 32,
  },
  {
    id: 3,
    moy: 10,
  },
  {
    id: 4,
    moy: 80,
  },
];

export default function MyStats() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // Détruire le graphique existant
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["ASN", "Meca Q", "Electronique", "Physique"],
            datasets: [
              {
                type: "bar",
                label: "Score élève",
                data: [
                  courses[0].score,
                  courses[1].score,
                  courses[2].score,
                  courses[3].score,
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1,
              },
              {
                type: "line",
                label: "Moyenne classe",
                data: [
                  moyenne[0].moy,
                  moyenne[1].moy,
                  moyenne[2].moy,
                  moyenne[3].moy,
                ],
                fill: false,
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col h-full gap-10">
      <Header title={"My stats"} />
      <div className="flex flex-col flex-1 items-center">
        <Container className="h-3/4 w-3/4 max-w-[700px] border-2 border-white hover:border-accent-300 transition">
          <canvas ref={chartRef} height={400}></canvas>
        </Container>
      </div>
    </div>
  );
}
