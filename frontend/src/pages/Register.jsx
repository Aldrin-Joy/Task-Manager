import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Register the user
      await api.post("register/", {
        email,
        password,
      });

      // 2️⃣ Automatically log in the user after registration
      const res = await api.post("token/", {
        username: email, // Django token endpoint expects "username"
        password,
      });

      // 3️⃣ Save JWT token
      localStorage.setItem("token", res.data.access);

      // 4️⃣ Redirect to tasks page
      navigate("/tasks");
    } catch (err) {
      console.log("REGISTER ERROR 👉", err);

      if (err.response && err.response.data) {
        setError(
          err.response.data.error ||
          err.response.data.message ||
          "Registration failed"
        );
      } else {
        setError("Network / CORS error");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleRegister}>
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
          Register
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;
