import React, { useState } from "react";
import "../styles.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username === "arbaz" && password === "ownerpass") {
      onLogin({ id: 1, name: "Admin", role: "owner" });
    } else if (username === "user" && password === "userpass") {
      onLogin({ id: 2, name: "User", role: "viewer" });
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="login-card">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="arbaz or user"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="ownerpass or userpass"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
