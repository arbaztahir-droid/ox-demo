import React, { useState } from "react";
import Login from "./components/Login";
import OrdersTable from "./components/OrdersTable";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <div className="login-wrapper">
        <Login onLogin={setUser} />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <ToastContainer position="bottom-left" />
      <Navbar user={user} onLogout={() => setUser(null)} />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <h1 className="welcome-text">Hi {user.name}</h1>
          <div className="card">
            <h2>Orders</h2>
            <OrdersTable user={user} />
          </div>
        </main>
      </div>
    </div>
  );
}
