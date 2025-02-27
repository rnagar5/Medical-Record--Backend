import logger from '../libs/logger.js';

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    logger.error(`AppError - ${message} (Status: ${statusCode})`);

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;


