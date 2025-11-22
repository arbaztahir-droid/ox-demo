import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h3>Oso Authorization Demo</h3>
      </div>
      <div className="nav-right">
        <span className="user-role">{user.role.toUpperCase()}</span>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}
