export default function ConfirmDialog({ task, isProcessing, onCancel, onConfirm }) {
  if (!task) {
    return null;
  }

  return (
    <div className="dialog-backdrop" role="presentation">
      <section
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <p className="dialog-kicker">Eliminar tarea</p>
        <h2 id="confirm-dialog-title">¿Querés eliminar “{task.name}”?</h2>
        <p className="dialog-copy">Esta acción no se puede deshacer.</p>
        <div className="dialog-actions">
          <button type="button" className="button button-secondary" onClick={onCancel} disabled={isProcessing}>
            Cancelar
          </button>
          <button type="button" className="button button-danger" onClick={onConfirm} disabled={isProcessing}>
            {isProcessing ? 'Eliminando...' : 'Eliminar tarea'}
          </button>
        </div>
      </section>
    </div>
  );
}
