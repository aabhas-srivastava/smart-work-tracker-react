import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddTaskPage from "./pages/AddTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import type { Task, TaskStatus, TaskPriority } from "./types/task";
import "./index.css";

const STORAGE_KEY = "tasks";
const PRIORITIES: TaskPriority[] = ["High", "Medium", "Low"];
const TAG_POOL = ["Frontend", "React", "Backend", "API", "Bug", "UI", "Database"];

function mapTodoToTask(todo: {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}): Task {
  const status: TaskStatus = todo.completed
    ? "Completed"
    : todo.id % 3 === 0
    ? "In Progress"
    : "Todo";

  const tag1 = TAG_POOL[todo.id % TAG_POOL.length];
  const tag2 = TAG_POOL[(todo.id + 2) % TAG_POOL.length];
  const tags = tag1 === tag2 ? [tag1] : [tag1, tag2];

  return {
    id: todo.id,
    title: todo.title,
    status,
    priority: PRIORITIES[todo.id % 3],
    tags,
  };
}

function getInitialTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    //do nothing
  }
  return [];
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);
  const [loading, setLoading] = useState(() => getInitialTasks().length === 0);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    if (tasks.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    let cancelled = false;

    const API_URL = import.meta.env.VITE_API_URL;

    if (!API_URL) {
      setError("api missing. check your .env file");
      setLoading(false);
      return;
    }

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const mapped = data.map(mapTodoToTask);
        setTasks(mapped);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tasks.length]);

  // saving to localstorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const updateTask = (updated: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  const deleteTask = (id: number) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "" || task.priority === priorityFilter;
      const matchesTag = tagFilter === "" || task.tags.includes(tagFilter);

      return matchesSearch && matchesStatus && matchesPriority && matchesTag;
    });
  }, [tasks, search, statusFilter, priorityFilter, tagFilter]);

  if (loading) {
    return (
      <div className="container">
        <p style={{ padding: "40px 0", textAlign: "center" }}>Loading tasks…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p style={{ padding: "40px 0", textAlign: "center", color: "red" }}>
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              tasks={tasks}
              filteredTasks={filteredTasks}
              search={search}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              tagFilter={tagFilter}
              onSearchChange={setSearch}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
              onTagChange={setTagFilter}
              onEdit={updateTask}
              onDelete={handleDelete}
            />
          }
        />

        <Route
          path="/add"
          element={
            <AddTaskPage
              existingIds={tasks.map((t) => t.id)}
              onAdd={addTask}
            />
          }
        />

        <Route
          path="/edit/:id"
          element={<EditTaskPage tasks={tasks} onUpdate={updateTask} />}
        />
      </Routes>
    </BrowserRouter>
  );
}