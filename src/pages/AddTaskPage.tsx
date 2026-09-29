import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import Header from "../components/Header";

interface AddTaskPageProps {
  existingIds: number[];
  onAdd: (task: Task) => void;
}

export default function AddTaskPage({ existingIds, onAdd }: AddTaskPageProps) {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const numId = Number(id);
    if (existingIds.includes(numId)) {
      alert("ID already exists.");
      return;
    }

    if (!status || !priority) return;

    const newTask: Task = {
      id: numId,
      title: title.trim(),
      status,
      priority,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onAdd(newTask);
    navigate("/"); // go back to home after adding
  };

  return (
    <div className="container">
      <Header />

      <section className="add-task">
        <h2>Add New Task</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="number"
              placeholder="Task ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              required
            >
              <option value="">Select Status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              required
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-add">
            Add Task
          </button>

          <Link to="/" style={{ marginLeft: "12px" }}>
            Cancel
          </Link>
        </form>
      </section>
    </div>
  );
}