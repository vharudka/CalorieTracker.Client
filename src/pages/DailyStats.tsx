import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import MacroBreakdown from "../components/MacroBreakdown";
import SummaryCards from "../components/SummaryCards";
import PeriodSelector from "../components/PeriodSelector";
import { getDailyStats } from "../api/stats";
import type { DailyStatsResponse } from "../models/stats/DailyStatsResponse";

export default function DailyStats() {
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [stats, setStats] = useState<DailyStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStats(selectedDate: string) {
    try {
      setLoading(true);
      setError(null);
      const data = await getDailyStats({ date: selectedDate });
      setStats(data);
    } catch {
      setError("Failed to load daily stats");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats(date);
  }, [date]);

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
          title="Daily Stats"
          label="Select Date"
          type="date"
          value={date}
          onChange={setDate}
        />

        <SummaryCards
          title="Summary"
          items={[
            {
              title: "Total Calories",
              value: `${stats.totalCalories} kcal`,
              sub: `Goal: ${stats.dailyCalorieLimit} kcal`,
            },
            {
              title: "Remaining",
              value: `${stats.remainingCalories} kcal`,
              sub:
                stats.remainingCalories > 0
                  ? "You're doing great today"
                  : "You've exceeded your daily limit",
              highlight: true,
            },
          ]}
        />

        <MacroBreakdown
          protein={stats.totalProtein}
          fat={stats.totalFat}
          carbs={stats.totalCarbohydrates}
        />

        <div className="card">
          <h2>Food Entries</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grams</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Fat</th>
                <th>Carbs</th>
                <th>Eaten At</th>
              </tr>
            </thead>
            <tbody>
              {stats.entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.grams}g</td>
                  <td>{entry.calories}</td>
                  <td>{entry.protein}g</td>
                  <td>{entry.fat}g</td>
                  <td>{entry.carbohydrates}g</td>
                  <td>{entry.eatenAt.replace("T", " ").slice(11, 16)}</td>
                </tr>
              ))}
              {stats.entries.length === 0 && (
                <tr>
                  <td colSpan={7} className="no-entries">
                    No entries for this day
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}