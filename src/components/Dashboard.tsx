import type { Task } from "../types/task";

interface DashboardProps {
  tasks: Task[];
}

export default function Dashboard({ tasks }: DashboardProps) {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "Todo").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </div>
        <div className="stat-card todo">
          <h3>Todo</h3>
          <p>{todo}</p>
        </div>
        <div className="stat-card progress">
          <h3>In Progress</h3>
          <p>{inProgress}</p>
        </div>
        <div className="stat-card completed">
          <h3>Completed</h3>
          <p>{completed}</p>
        </div>
      </div>
    </section>
  );
}