import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext"; // Make sure ThemeContext.jsx exists

function App() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      {/* Navbar with theme toggle */}
      <div style={{ padding: "10px", textAlign: "right", borderBottom: "1px solid gray" }}>
        <button onClick={toggleTheme}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
