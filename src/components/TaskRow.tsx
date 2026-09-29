import { Link } from "react-router-dom";
import type { Task } from "../types/task";

interface TaskRowProps {
  task: Task;
  onDelete: (id: number) => void;
}

export default function TaskRow({ task, onDelete }: TaskRowProps) {
  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>
        <span className="badge">{task.status}</span>
      </td>
      <td>
        <span className="badge">{task.priority}</span>
      </td>
      <td>
        {task.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </td>
      <td>
        {/* go to edit page */}
        <Link to={`/edit/${task.id}`} className="btn-edit">
          Edit
        </Link>

        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}