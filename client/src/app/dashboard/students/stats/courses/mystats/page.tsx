"use client";

import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale, Chart, ChartData } from "chart.js";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { useEffect, useRef, useCallback } from "react";
import { registerables } from "chart.js";
import Container from "@/components/layout/Container";

Chart.register(...registerables);

const courses = [
  {
    id: 1,
    course: "ASN",
    score: 12,
    moy: 50,
  },
  {
    id: 2,
    course: "Meca Q",
    score: 52,
    moy: 32,
  },
  {
    id: 3,
    course: "Electronique",
    score: 69,
    moy: 10,
  },
  {
    id: 4,
    course: "Physique",
    score: 100,
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
                  courses[0].moy,
                  courses[1].moy,
                  courses[2].moy,
                  courses[3].moy,
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
    <div className="flex flex-col gap-10">
      <div className="flex text-4xl font-black">MyStats</div>
      <div className="flex flex-col items-center">
        <Container className="max-h-xl max-w-xl border-2 border-dark-50 hover:border-accent-300 transition">
          <canvas ref={chartRef} width={400} height={400}></canvas>
        </Container>
      </div>
    </div>
  );
}
