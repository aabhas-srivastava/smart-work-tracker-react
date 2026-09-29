import { useState } from "react";
import type { Task, TaskStatus, TaskPriority } from "../types/task";

interface AddTaskFormProps {
  existingIds: number[];
  onAdd: (task: Task) => void;
}

export default function AddTaskForm({ existingIds, onAdd }: AddTaskFormProps) {
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

    setId("");
    setTitle("");
    setStatus("");
    setPriority("");
    setTags("");
  };

  return (
    <section className="add-task">
      <h2>Add Task</h2>
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
      </form>
    </section>
  );
}