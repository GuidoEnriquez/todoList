import TaskCard from '../TaskCard/TaskCard.jsx';

export default function TaskList({ tasks, deletingId, updatingId, onToggle, onView, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">○</span>
        <h3>Todavía no hay tareas</h3>
        <p>Creá la primera desde el formulario para empezar a organizarte.</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isDeleting={deletingId === task.id}
          isUpdating={updatingId === task.id}
          onToggle={onToggle}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
