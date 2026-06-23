import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp;

  if (Date.now() >= exp * 1000) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}