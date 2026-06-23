import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Props {
  title: string;
  labels: string[];
  data: number[];
}

export default function CaloriesBarChart({ title, labels, data }: Props) {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = document.getElementById(title.replace(/\s+/g, "") + "-chart") as HTMLCanvasElement;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Calories",
            data,
            backgroundColor: "rgba(123, 97, 255, 0.5)",
            borderColor: "#7b61ff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
  }, [labels, data, title]);

  return (
    <div className="card">
      <h2>{title}</h2>
      <canvas id={title.replace(/\s+/g, "") + "-chart"}></canvas>
    </div>
  );
}