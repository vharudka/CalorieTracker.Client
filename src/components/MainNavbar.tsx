import { Link, useNavigate } from "react-router-dom";

export default function MainNavbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/food-entries" className="nav-logo">Calorie Tracker</Link>
      </div>

      <div className="nav-right">
        <Link to="/daily-stats" className="nav-link">Daily</Link>
        <Link to="/weekly-stats" className="nav-link">Weekly</Link>
        <Link to="/monthly-stats" className="nav-link">Monthly</Link>
        <Link to="/food-entries" className="nav-link">Entries</Link>
        <Link to="/goals" className="nav-link">Goals</Link>

        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}