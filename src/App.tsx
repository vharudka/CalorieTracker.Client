import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodEntries from "./pages/FoodEntries";
import CreateFoodEntry from "./pages/CreateFoodEntry";
import UpdateFoodEntry from "./pages/UpdateFoodEntry";
import DailyStats from "./pages/DailyStats";
import WeeklyStats from "./pages/WeeklyStats";
import MonthlyStats from "./pages/MonthlyStats";
import UserGoals from "./pages/UserGoals";
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

      <Route
        path="/daily-stats"
        element={
          <ProtectedRoute>
            <DailyStats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/weekly-stats"
        element={
          <ProtectedRoute>
            <WeeklyStats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/monthly-stats"
        element={
          <ProtectedRoute>
            <MonthlyStats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <UserGoals />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}