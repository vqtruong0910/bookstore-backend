class ApiError extends Error {
  constructor(statusCode, message , isOperational = true, stack) {
    super(message,stack);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;