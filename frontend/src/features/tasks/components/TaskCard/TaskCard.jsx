function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function ActionIcon({ type }) {
  const iconProps = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (type === 'view') {
    return (
      <svg {...iconProps}>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

  if (type === 'edit') {
    return (
      <svg {...iconProps}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="m19 6-1 14H6L5 6" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  );
}

export default function TaskCard({ task, isDeleting, isUpdating, isViewing, onToggle, onView, onEdit, onDelete }) {
  return (
    <article className={`task-card${task.completed ? ' is-completed' : ''}`}>
      <div className="task-card-topline">
        <span className="task-index">#{String(task.id).padStart(2, '0')}</span>
        <time dateTime={task.createdAt} className="task-date">
          {formatDate(task.createdAt)}
        </time>
      </div>
      <label className="task-check">
        <input
          type="checkbox"
          checked={Boolean(task.completed)}
          onChange={() => onToggle(task)}
          disabled={isDeleting || isUpdating}
          aria-label={`${task.completed ? 'Marcar como pendiente' : 'Marcar como realizada'}: ${task.name}`}
        />
        <span className="checkmark" aria-hidden="true" />
        <span className="task-name">{task.name}</span>
      </label>
      <p className="task-description">{task.description}</p>
      <span className="task-status">
        {isUpdating ? 'Guardando...' : task.completed ? 'Realizada' : 'Pendiente'}
      </span>
      <div className="task-actions">
        <button type="button" className="button button-quiet" onClick={() => onView(task)} disabled={isDeleting || isUpdating || isViewing}>
          <span className="button-icon"><ActionIcon type="view" /></span>
          {isViewing ? 'Cargando...' : 'Ver detalles'}
        </button>
        <button type="button" className="button button-quiet" onClick={() => onEdit(task)} disabled={isDeleting || isUpdating}>
          <span className="button-icon"><ActionIcon type="edit" /></span>
          Editar
        </button>
        <button type="button" className="button button-quiet button-quiet-danger" onClick={() => onDelete(task)} disabled={isDeleting || isUpdating}>
          <span className="button-icon"><ActionIcon type="delete" /></span>
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </article>
  );
}
