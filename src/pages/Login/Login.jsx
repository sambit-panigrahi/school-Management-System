import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      // Login failed
      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      // Save login details EXACTLY how Sidebar/Home expects
      localStorage.setItem("userName", data.user.username);
      localStorage.setItem("userRole", data.user.role);

      // Redirect to your existing home page
      navigate("/home");

    } catch (err) {
      setError("Server not responding");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="login-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
