import React, { useEffect, useRef } from "react";
import { Chart, type ChartConfiguration, registerables } from "chart.js";


Chart.register(...registerables);

interface PointsChartProps {
  points: number;
}

export default function PointsChart({ points }: PointsChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Se já existir gráfico, destruir antes de recriar
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const config: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: {
        labels: ["Pontos"],
        datasets: [
          {
            data: [points, Math.max(0, 100 - points)],
            backgroundColor: ["#4CAF50", "#e0e0e0"],
            borderWidth: 0
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    };

    chartInstance.current = new Chart(chartRef.current, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [points]);

  return <canvas ref={chartRef} />;
}
