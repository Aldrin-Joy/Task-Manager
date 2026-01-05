import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 5;

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const fetchTasks = async (status = "", ordering = "") => {
    let url = "tasks/?";
    if (status && status !== "all") url += `status=${status}&`;
    if (ordering) url += `ordering=${ordering}`;
    const res = await api.get(url);
    setTasks(res.data);
    setPage(1);
  };

  useEffect(() => {
    fetchTasks(filter, sort);
  }, [filter, sort]);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    await api.post("tasks/", {
      title: newTask,
      due_date: dueDate || null,
      completed: false,
    });

    setNewTask("");
    setDueDate("");
    fetchTasks(filter, sort);
  };

  const handleDelete = async (id) => {
    await api.delete(`tasks/${id}/`);
    fetchTasks(filter, sort);
  };

  const handleToggleComplete = async (task) => {
    await api.patch(`tasks/${task.id}/`, { completed: !task.completed });
    fetchTasks(filter, sort);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / PAGE_SIZE);
  const paginatedTasks = filteredTasks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>My Tasks</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <p>Logged in as <strong>{username}</strong></p>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "6px" }}
      />

      <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ flex: 2, padding: "6px" }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ flex: 1, padding: "6px" }}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{ marginBottom: "10px", padding: "6px" }}
      >
        <option value="">Sort by</option>
        <option value="due_date">Due Date (Earliest)</option>
        <option value="-due_date">Due Date (Latest)</option>
        <option value="created_at">Created (Oldest)</option>
        <option value="-created_at">Created (Newest)</option>
      </select>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {paginatedTasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: "8px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                onClick={() => handleToggleComplete(task)}
                style={{
                  cursor: "pointer",
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
              {task.due_date && (
                <div style={{ fontSize: "12px", color: "#555" }}>
                  Due: {task.due_date}
                </div>
              )}
            </div>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page} of {totalPages || 1}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Tasks;
