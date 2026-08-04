export default class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }

  static badRequest(message) {
    return new ApiError(message, 400);
  }

  static notFound(message) {
    return new ApiError(message, 404);
  }
}