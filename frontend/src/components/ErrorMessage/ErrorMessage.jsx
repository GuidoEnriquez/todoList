export default function ErrorMessage({ message, onRetry }) {
  if (!message) {
    return null;
  }

  return (
    <div className="error-message" role="alert">
      <span className="error-mark" aria-hidden="true">!</span>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="button button-small button-light" onClick={onRetry}>
          Reintentar
        </button>
      ) : null}
    </div>
  );
}
