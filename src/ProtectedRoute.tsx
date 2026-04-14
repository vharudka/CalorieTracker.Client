import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  const exp = Number(localStorage.getItem("token_exp"));

  if (!token || Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_exp");

      return <Navigate to="/login" replace />;
  }

  return children;
}