import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

function App() {
  const [health, setHealth] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function checkBackend() {
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/health`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setHealth(await response.json());
    } catch (err) {
      setHealth(null);
      setError(`Backend request failed: ${err.message}`);
    }
  }

  async function loadUsers() {
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/users`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(`Could not load users: ${err.message}`);
    }
  }

  useEffect(() => {
    checkBackend();
    loadUsers();
  }, []);

  return (
    <main className="container">
      <div className="card">
        <h1>Selfhost Full-Stack Test</h1>
        <p className="subtitle">React frontend connected to an Express backend</p>

        <div className="section">
          <h2>Deployment status</h2>
          <p><strong>Frontend:</strong> Running</p>
          <p><strong>Backend:</strong> {health ? "Connected" : "Not connected"}</p>
          <p className="api">API: {API_URL}</p>

          <button onClick={checkBackend}>Check Backend</button>
          <button onClick={loadUsers}>Load Users</button>
        </div>

        {health && (
          <div className="success">
            <strong>Backend response:</strong>
            <pre>{JSON.stringify(health, null, 2)}</pre>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <div className="section">
          <h2>Users from Backend</h2>
          {users.length === 0 ? (
            <p>No users loaded.</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <strong>{user.name}</strong> — {user.role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
