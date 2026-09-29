import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Filters from "../components/Filters";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";
import type { Task } from "../types/task";

interface HomePageProps {
  tasks: Task[];
  filteredTasks: Task[];
  search: string;
  statusFilter: string;
  priorityFilter: string;
  tagFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function HomePage({
  tasks,
  filteredTasks,
  search,
  statusFilter,
  priorityFilter,
  tagFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onTagChange,
  onDelete,
}: HomePageProps) {
  return (
    <div className="container">
      <Header />

      <Dashboard tasks={tasks} />

      <Filters
        search={search}
        status={statusFilter}
        priority={priorityFilter}
        tag={tagFilter}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
        onTagChange={onTagChange}
      />

      {/* link to add task page */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/add" className="btn btn-add">
          + Add New Task
        </Link>
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={onDelete}
      />
    </div>
  );
}