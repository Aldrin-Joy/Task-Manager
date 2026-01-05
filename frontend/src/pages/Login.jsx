import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("token/", {
        username: email,  // Django expects username field, we use email
        password,
      });

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.access);
      
      localStorage.setItem("username", email);

      // Redirect to tasks page
      navigate("/tasks");
    } catch (err) {
      console.log("LOGIN ERROR 👉", err);

      if (err.response && err.response.data) {
        setError(
          err.response.data.detail || "Invalid email or password"
        );
      } else {
        setError("Network / CORS error");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button style={{ width: "100%", padding: "8px" }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
