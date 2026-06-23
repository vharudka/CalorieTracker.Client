import { Link } from "react-router-dom";

export default function AuthNavbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/food-entries" className="nav-logo">CalorieTracker</Link>
      </div>
    </nav>
  );
}