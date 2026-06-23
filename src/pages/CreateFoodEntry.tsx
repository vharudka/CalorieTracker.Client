import { useState } from "react";
import { createFoodEntry } from "../api/food-entries"; 
import type { CreateFoodEntryRequest } from "../models/food-entries/CreateFoodEntryRequest";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

export default function CreateFoodEntry() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateFoodEntryRequest>({
    barcode: "123456789",
    grams: 150,
    eatenAt: "2026-01-01T12:30",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await createFoodEntry(form);
      navigate("/food-entries");
    } catch (err: any) {
      setError("Failed to create food entry");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <MainNavbar />

      <div className="container">
        <div className="card">
          <h1>Create Food Entry</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Barcode</label>
              <input
                name="barcode"
                type="text"
                value={form.barcode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Grams</label>
              <input
                name="grams"
                type="number"
                value={form.grams}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Eaten At</label>
              <input
                name="eatenAt"
                type="datetime-local"
                value={form.eatenAt}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}