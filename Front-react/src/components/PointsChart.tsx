import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Props {
  points: number;
}

export default function PointsChart({ points }: Props) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destruir gráfico antigo para evitar duplicação
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Pontos"],
        datasets: [
          {
            data: [points, 100 - points],
            backgroundColor: ["#4CAF50", "#e0e0e0"],
           // cutout: "70%", // Faz virar estilo "anel"
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }, [points]);

  return <canvas ref={chartRef} />;
}
