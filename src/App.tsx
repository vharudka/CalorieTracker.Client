import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodEntries from "./pages/FoodEntries";
import CreateFoodEntry from "./pages/CreateFoodEntry";
import UpdateFoodEntry from "./pages/UpdateFoodEntry";
import { ProtectedRoute } from "./ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Register */}
      <Route path="/register" element={<Register />} />

      {/* Dashboard (protected) */}
      <Route
        path="/food-entries"
        element={
          <ProtectedRoute>
            <FoodEntries />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-food-entry"
        element={
          <ProtectedRoute>
            <CreateFoodEntry />
          </ProtectedRoute>
        }
      />

      <Route
        path="/food-entries/:id/update"
        element={
          <ProtectedRoute>
            <UpdateFoodEntry />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}