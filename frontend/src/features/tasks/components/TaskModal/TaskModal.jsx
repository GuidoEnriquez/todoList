import TaskForm from '../TaskForm/TaskForm.jsx';

export default function TaskModal({ isOpen, task, isSubmitting, onSubmit, onClose }) {
  if (!isOpen) {
    return null;
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && !isSubmitting) {
      onClose();
    }
  }

  return (
    <div className="task-modal-backdrop" onMouseDown={handleBackdropClick}>
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Cerrar formulario"
        >
          ×
        </button>
        <TaskForm
          task={task}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </section>
    </div>
  );
}
