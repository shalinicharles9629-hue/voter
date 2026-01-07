import { useState } from "react";

function AdminLogin({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      setPage("admin-dashboard");
    } else {
      alert("❌ Invalid Admin Credentials");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>🧑‍💼 Admin Login</h2>

        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleAdminLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
