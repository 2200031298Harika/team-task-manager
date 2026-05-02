import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchStats();
    fetchTasks();

  }, []);

  const fetchStats = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/projects/stats",
        {
          headers: {
            authorization: token
          }
        }
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/projects/tasks",
        {
          headers: {
            authorization: token
          }
        }
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const createTask = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/projects/task/create",
        {
          title,
          description,
          assignedTo: 1,
          projectId: 1,
          deadline: "2026-05-10"
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      setTitle("");
      setDescription("");

      fetchTasks();
      fetchStats();

    } catch (error) {

      console.log(error);

    }

  };

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/projects/task/${id}`,
        { status },
        {
          headers: {
            authorization: token
          }
        }
      );

      fetchTasks();
      fetchStats();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/projects/task/${id}`,
        {
          headers: {
            authorization: token
          }
        }
      );

      fetchTasks();
      fetchStats();

    } catch (error) {

      console.log(error);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  const filteredTasks = tasks.filter((task) => {

    const matchesFilter =
      filter === "All" || task.status === filter;

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;

  });

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020b2d",
        color: "white",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <h1 style={{ fontSize: "60px" }}>
          Dashboard
        </h1>

        <button
          onClick={logout}
          style={{
            background: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

      {stats && (

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px"
          }}
        >

          <div style={cardStyle}>
            <h2>Total Tasks</h2>
            <p>{stats.totalTasks}</p>
          </div>

          <div style={cardStyle}>
            <h2>Completed</h2>
            <p>{stats.completedTasks}</p>
          </div>

          <div style={cardStyle}>
            <h2>Pending</h2>
            <p>{stats.pendingTasks}</p>
          </div>

          <div style={cardStyle}>
            <h2>In Progress</h2>
            <p>{stats.inProgressTasks}</p>
          </div>

        </div>

      )}

      <div
        style={{
          marginTop: "50px",
          maxWidth: "400px"
        }}
      >

        <h2>Create Task</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={createTask}
          style={createButton}
        >
          Create Task
        </button>

      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "12px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid gray",
          background: "#1f2937",
          color: "white",
          marginTop: "30px"
        }}
      />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >

        <button
          onClick={() => setFilter("All")}
          style={filterButton}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Pending")}
          style={filterButton}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("In Progress")}
          style={filterButton}
        >
          In Progress
        </button>

        <button
          onClick={() => setFilter("Completed")}
          style={filterButton}
        >
          Completed
        </button>

      </div>

      <h2 style={{ marginTop: "50px" }}>
        Tasks
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >

        {filteredTasks.map((task) => (

          <div
            key={task.id}
            style={{
              background: "#09163b",
              padding: "20px",
              borderRadius: "15px",
              width: "300px",
              border: "1px solid #32436b",
              boxShadow: "0px 0px 10px rgba(255,255,255,0.1)"
            }}
          >

            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <h3>Status: {task.status}</h3>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "15px"
              }}
            >

              <button
                onClick={() => updateStatus(task.id, "Pending")}
                style={smallButton}
              >
                Pending
              </button>

              <button
                onClick={() => updateStatus(task.id, "In Progress")}
                style={smallButton}
              >
                Progress
              </button>

              <button
                onClick={() => updateStatus(task.id, "Completed")}
                style={smallButton}
              >
                Complete
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  ...smallButton,
                  background: "red"
                }}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      <footer
        style={{
          marginTop: "60px",
          textAlign: "center",
          color: "#9ca3af"
        }}
      >
        Team Task Manager © 2026
      </footer>

    </div>

  );

}

const cardStyle = {
  background: "#09163b",
  padding: "25px",
  borderRadius: "15px",
  width: "180px",
  textAlign: "center",
  border: "1px solid #32436b",
  boxShadow: "0px 0px 10px rgba(255,255,255,0.1)"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid gray",
  background: "#1f2937",
  color: "white"
};

const createButton = {
  width: "106%",
  padding: "12px",
  marginTop: "15px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

const filterButton = {
  padding: "10px 15px",
  background: "#374151",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const smallButton = {
  padding: "7px 10px",
  border: "none",
  borderRadius: "5px",
  background: "#4b5563",
  color: "white",
  cursor: "pointer"
};

export default Dashboard;