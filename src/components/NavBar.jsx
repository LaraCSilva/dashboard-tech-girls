import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <div className="logo-mark" />
        <span>Tech Girls</span>
      </div>

      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Upload
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
        <span className="navbar-link-disabled">Histórico</span>
        <span className="navbar-link-disabled">Configurações</span>
      </nav>

      <div className="navbar-avatar">TG</div>
    </div>
  );
}
