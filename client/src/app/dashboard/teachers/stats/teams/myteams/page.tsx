"use client";


import React from "react";
import { Chart } from "chart.js";
import { useEffect, useRef } from "react";
import { registerables } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import Header from "@/components/Dashboard/Common/Layout/Header";
import Container from "@/components/Layout/Container";


Chart.register(...registerables);

const classes = [
  {
    id: 1,
    class: "Classe 1",
    score: 20,
  },
  {
    id: 2,
    class: "Classe 2",
    score: 52,
  },
  {
    id: 3,
    class: "Classe 3",
    score: 100,
  },
  {
    id: 4,
    class: "Classe 4",
    score: 16,
  },
];

const moyenne = [
  {
    moy: 47,
  },
];

const mediane = [
  {
    med: 50,
  },
];

export default function MyTeams() {
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
            labels: [
              classes[0].class,
              classes[1].class,
              classes[2].class,
              classes[3].class,
            ],
            datasets: [
              {
                type: "bar",
                label: "Score élève",
                data: [
                  classes[0].score,
                  classes[1].score,
                  classes[2].score,
                  classes[3].score,
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
                  moyenne[0].moy,
                  moyenne[0].moy,
                  moyenne[0].moy,
                ],
                fill: false,
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1,
              },
              {
                type: "line",
                label: "Médiane classe",
                data: [
                  mediane[0].med,
                  mediane[0].med,
                  mediane[0].med,
                  mediane[0].med,
                ],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
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
      <Header title="Stats" />
      <div className="flex flex-col flex-1 items-center">
        <Container className="h-3/4 w-3/4 max-w-[700px] border-2 border-white hover:border-accent-300 transition">
          <canvas ref={chartRef} height={400}></canvas>
        </Container>
      </div>
    </div>
  );
}
