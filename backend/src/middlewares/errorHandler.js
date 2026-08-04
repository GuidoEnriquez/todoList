export default function errorHandler(err, _req, res, _next) {
  const isValidationError = err.name === 'SequelizeValidationError';
  const statusCode = isValidationError ? 400 : err.statusCode || err.status || 500;
  const isClientError = statusCode >= 400 && statusCode < 500;
  const message = isValidationError
    ? err.errors.map((item) => item.message).join('. ')
    : err.isOperational || isClientError
      ? err.message || 'La solicitud no es válida'
      : 'Error interno del servidor';

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    error: { message },
  });
}
