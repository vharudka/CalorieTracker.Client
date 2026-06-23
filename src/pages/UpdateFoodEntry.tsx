import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFoodEntry, updateFoodEntry } from "../api/food-entries";
import type { FoodEntryResponse } from "../models/food-entries/FoodEntryResponse";
import type { UpdateFoodEntryRequest } from "../models/food-entries/UpdateFoodEntryRequest";
import MainNavbar from "../components/MainNavbar";

export default function UpdateFoodEntry() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<UpdateFoodEntryRequest>({
    barcode: "",
    grams: 0,
    eatenAt: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        if (!id) return;
        const entry: FoodEntryResponse = await getFoodEntry(id);

        setForm({
          barcode: entry.barcode,
          grams: entry.grams,
          eatenAt: entry.eatenAt.slice(0, 16),
        });
      } catch {
        setError("Failed to load food entry");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    try {
      setSaving(true);
      await updateFoodEntry(id, form);
      navigate("/food-entries");
    } catch {
      setError("Failed to update food entry");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <>
      <MainNavbar />

      <div className="container">
        <div className="card">
          <h1>Edit Food Entry</h1>

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

            <button className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}