import { useEffect, useState } from "react";
import { getDashboard } from "../api/auth";

export default function Dashboard() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Not logged in");
      return;
    }

    getDashboard(token)
      .then(res => setMessage(res))
      .catch(() => setMessage("Error loading dashboard"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}