import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import { setUserGoals } from "../api/user-goals";
import axiosClient from "../api/axios-client";
import type { UserGoalsResponse } from "../models/user-goals/UserGoalsResponse";

export default function UserGoals() {
  const [goal, setGoal] = useState<number>(2000);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function loadGoal() {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosClient.get<UserGoalsResponse>("/user-goals");
      setGoal(res.data.dailyCalorieLimit);
    } catch {
      // If no goal exists yet, backend may return 404 — that’s fine
      setGoal(2000);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await setUserGoals({ dailyCalorieLimit: goal });
      setSuccess(true);
    } catch {
      setError("Failed to save your goal");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadGoal();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <>
      <MainNavbar />

      <div className="container">
        <div className="card">
          <h1>User Goals</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Daily Calorie Limit</label>
              <input
                type="number"
                min={500}
                max={10000}
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">Goal saved successfully</p>}

            <button className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Goal"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}