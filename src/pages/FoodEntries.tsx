import { useEffect, useState } from "react";
import { getAllFoodEntries, deleteFoodEntry } from "../api/food-entries";
import type { FoodEntryResponse } from "../models/food-entries/FoodEntryResponse";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

export default function FoodEntries() {
  const navigate = useNavigate();

  const [entries, setEntries] = useState<FoodEntryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllFoodEntries();
        setEntries(data);
      } catch {
        setError("Failed to load food entries");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      await deleteFoodEntry(id);
      setEntries(entries.filter((e) => e.id !== id));
    } catch {
      alert("Failed to delete entry");
    }
  }

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <>
      <MainNavbar />

      <div className="container">

        <div className="card entries-header">
          <h1>Food Entries</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/create-food-entry")}
          >
            + Add Entry
          </button>
        </div>

        <div className="card">
          {error && <p className="error-text">{error}</p>}
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Barcode</th>
                <th>Grams</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Fat</th>
                <th>Carbs</th>
                <th>Eaten At</th>
                <th className="actions-col"></th>
              </tr>
            </thead>

            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.barcode}</td>
                  <td>{entry.grams}g</td>
                  <td>{entry.calories}</td>
                  <td>{entry.protein}g</td>
                  <td>{entry.fat}g</td>
                  <td>{entry.carbohydrates}g</td>
                  <td>{entry.eatenAt.replace("T", " ").slice(0, 16)}</td>
                  <td className="actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => navigate(`/food-entries/${entry.id}/update`)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {entries.length === 0 && (
                <tr>
                  <td colSpan={9} className="no-entries">
                    No entries found
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