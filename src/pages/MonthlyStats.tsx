import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import MacroBreakdown from "../components/MacroBreakdown";
import CaloriesBarChart from "../components/CaloriesBarChart";
import SummaryCards from "../components/SummaryCards";
import PeriodSelector from "../components/PeriodSelector";
import { getMonthlyStats } from "../api/stats";
import type { MonthlyStatsResponse } from "../models/stats/MonthlyStatsResponse";

export default function MonthlyStats() {
  const [month, setMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const [stats, setStats] = useState<MonthlyStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStats(selectedMonth: string) {
    try {
      setLoading(true);
      setError(null);

      const [yearStr, monthStr] = selectedMonth.split("-");
      const year = parseInt(yearStr);
      const month = parseInt(monthStr);

      const data = await getMonthlyStats({ year, month });
      setStats(data);
    } catch {
      setError("Failed to load monthly stats");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats(month);
  }, [month]);

  if (loading) return <p className="loading-text">Loading...</p>;

  if (error)
    return (
      <>
        <MainNavbar />
        <div className="container">
          <div className="card">
            <p className="error-text">{error}</p>
          </div>
        </div>
      </>
    );

  if (!stats) return null;

  return (
    <>
      <MainNavbar />

      <div className="container">

        <PeriodSelector
          title="Monthly Stats"
          label="Select Month"
          type="month"
          value={month}
          onChange={setMonth}
        />

        <SummaryCards
          title="Monthly Summary"
          items={[
            {
              title: "Total Calories",
              value: `${stats.totalCalories.toLocaleString()} kcal`,
              sub: `Monthly Goal: ${(stats.dailyCalorieLimit * 30).toLocaleString()} kcal`,
            },
            {
              title: "Average Per Day",
              value: `${stats.averageCalories} kcal`,
              sub:
                stats.remainingCalories > 0
                  ? "Great consistency this month"
                  : "You've exceeded your average daily calorie target",
              highlight: true,
            },
          ]}
        />

        <CaloriesBarChart
          title="Calories Per Day"
          labels={stats.dailyCalories.map((_, i) => (i + 1).toString())}
          data={stats.dailyCalories}
        />

        <MacroBreakdown
          protein={stats.totalProtein}
          fat={stats.totalFat}
          carbs={stats.totalCarbohydrates}
        />

      </div>
    </>
  );
}