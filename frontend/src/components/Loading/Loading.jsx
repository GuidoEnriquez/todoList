export default function Loading({ label = 'Cargando tareas...' }) {
  return (
    <p className="status-message loading-message" role="status">
      <span className="loading-dot" aria-hidden="true" />
      {label}
    </p>
  );
}
