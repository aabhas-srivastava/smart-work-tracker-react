import type { Task, TaskStatus, TaskPriority } from "../types/task";

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

export async function getTasks(): Promise<Task[]> {
  const API_URL = import.meta.env.VITE_API_URL;

  if (!API_URL) {
    throw new Error("API URL is missing. Check your .env file.");
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  return data.map(mapTodoToTask);
}