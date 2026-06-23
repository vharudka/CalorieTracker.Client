import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Props {
  protein: number;
  fat: number;
  carbs: number;
}

export default function MacroBreakdown({ protein, fat, carbs }: Props) {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("macroChart") as HTMLCanvasElement;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: ["Protein", "Fat", "Carbs"],
        datasets: [
          {
            data: [protein, fat, carbs],
            backgroundColor: ["#7b61ff", "#ff8fb8", "#8ee6c5"],
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        cutout: "60%",
        plugins: { legend: { display: false } },
      },
    });
  }, [protein, fat, carbs]);

  return (
    <div className="card">
      <h2>Macros Breakdown</h2>

      <div className="macro-chart-wrapper">
        <canvas id="macroChart"></canvas>

        <div className="macro-legend">
          <div>
            <span className="dot protein"></span> Protein:{" "}
            <strong>{protein}g</strong>
          </div>
          <div>
            <span className="dot fat"></span> Fat:{" "}
            <strong>{fat}g</strong>
          </div>
          <div>
            <span className="dot carbs"></span> Carbs:{" "}
            <strong>{carbs}g</strong>
          </div>
        </div>
      </div>
    </div>
  );
}