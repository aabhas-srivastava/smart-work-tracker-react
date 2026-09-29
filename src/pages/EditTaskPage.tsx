import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import Header from "../components/Header";

interface EditTaskPageProps {
  tasks: Task[];
  onUpdate: (task: Task) => void;
}

export default function EditTaskPage({ tasks, onUpdate }: EditTaskPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const taskId = Number(id);
  const existingTask = tasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (existingTask) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(existingTask.title);
      setStatus(existingTask.status);
      setPriority(existingTask.priority);
      setTags(existingTask.tags.join(", "));
    }
  }, [existingTask]);

  if (!existingTask) {
    return (
      <div className="container">
        <Header />
        <p>Task not found.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!status || !priority) return;

    const updatedTask: Task = {
      id: existingTask.id,
      title: title.trim(),
      status,
      priority,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onUpdate(updatedTask);
    navigate("/");
  };

  return (
    <div className="container">
      <Header />

      <section className="add-task">
        <h2>Edit Task #{existingTask.id}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="number" value={existingTask.id} disabled />
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
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              required
            >
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
            Save Changes
          </button>

          <Link to="/" style={{ marginLeft: "12px" }}>
            Cancel
          </Link>
        </form>
      </section>
    </div>
  );
}