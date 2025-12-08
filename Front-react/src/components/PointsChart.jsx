import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function PointsChart({ points }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Pontos"],
        datasets: [
          {
            data: [points, Math.max(0, 100 - points)],
            backgroundColor: ["#4CAF50", "#e0e0e0"],
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

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [points]);

  return <canvas ref={chartRef} />;
}
