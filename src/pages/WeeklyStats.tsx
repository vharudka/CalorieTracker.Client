import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import MacroBreakdown from "../components/MacroBreakdown";
import CaloriesBarChart from "../components/CaloriesBarChart";
import SummaryCards from "../components/SummaryCards";
import PeriodSelector from "../components/PeriodSelector";
import { getWeeklyStats } from "../api/stats";
import type { WeeklyStatsResponse } from "../models/stats/WeeklyStatsResponse";

export default function WeeklyStats() {
  const [week, setWeek] = useState<string>(() => {
    const now = new Date();
    const year = now.getFullYear();
    const weekNumber = Math.ceil(
      ((now.getTime() - new Date(year, 0, 1).getTime()) / 86400000 +
        new Date(year, 0, 1).getDay() +
        1) /
        7
    );
    return `${year}-W${String(weekNumber).padStart(2, "0")}`;
  });

  const [stats, setStats] = useState<WeeklyStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStats(selectedWeek: string) {
    try {
      setLoading(true);
      setError(null);

      const [yearStr, weekStr] = selectedWeek.split("-W");
      const year = parseInt(yearStr);
      const weekNum = parseInt(weekStr);

      const monday = new Date(year, 0, (weekNum - 1) * 7 + 1)
        .toISOString()
        .slice(0, 10);

      const data = await getWeeklyStats({ date: monday });
      setStats(data);
    } catch {
      setError("Failed to load weekly stats");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats(week);
  }, [week]);

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
          title="Weekly Stats"
          label="Select Week"
          type="week"
          value={week}
          onChange={setWeek}
        />

        <SummaryCards
          title="Weekly Summary"
          items={[
            {
              title: "Total Calories",
              value: `${stats.totalCalories.toLocaleString()} kcal`,
              sub: `Weekly Goal: ${(stats.dailyCalorieLimit * 7).toLocaleString()} kcal`,
            },
            {
              title: "Average Per Day",
              value: `${stats.averageCalories} kcal`,
              sub:
                stats.remainingCalories > 0
                  ? "Great consistency this week"
                  : "You've exceeded your daily limit",
              highlight: true,
            }
          ]}
        />

        <CaloriesBarChart
          title="Calories Per Day"
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
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