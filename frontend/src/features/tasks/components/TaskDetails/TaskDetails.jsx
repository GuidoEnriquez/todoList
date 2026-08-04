function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

export default function TaskDetails({ task, onClose }) {
  if (!task) {
    return null;
  }

  return (
    <div
      className="details-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section className="details-panel details-modal" role="dialog" aria-modal="true" aria-labelledby="task-details-title">
        <div className="details-heading">
          <div>
            <p className="section-kicker">Vista individual</p>
            <h2 id="task-details-title">{task.name}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Cerrar detalle">
            ×
          </button>
        </div>
        <p className="details-description">{task.description}</p>
        <p className={`details-status${task.completed ? ' is-completed' : ''}`}>
          {task.completed ? 'Tarea realizada' : 'Tarea pendiente'}
        </p>
        <dl className="details-meta">
          <div>
            <dt>Creada</dt>
            <dd><time dateTime={task.createdAt}>{formatDate(task.createdAt)}</time></dd>
          </div>
          <div>
            <dt>Última actualización</dt>
            <dd><time dateTime={task.updatedAt}>{formatDate(task.updatedAt)}</time></dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
