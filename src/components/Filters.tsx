interface FiltersProps {
  search: string;
  status: string;
  priority: string;
  tag: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onTagChange: (value: string) => void;
}

export default function Filters({
  search,
  status,
  priority,
  tag,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onTagChange,
}: FiltersProps) {
  return (
    <section className="filters">
      <h2>Search & Filters</h2>
      <div className="filter-row">
        <input
          type="text"
          placeholder="search tasks"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select value={priority} onChange={(e) => onPriorityChange(e.target.value)}>
          <option value="">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select value={tag} onChange={(e) => onTagChange(e.target.value)}>
          <option value="">All Tags</option>
          <option value="Frontend">Frontend</option>
          <option value="React">React</option>
          <option value="Backend">Backend</option>
          <option value="API">API</option>
          <option value="Bug">Bug</option>
        </select>
      </div>
    </section>
  );
}