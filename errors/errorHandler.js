import logger from '../libs/logger.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${req.method} ${req.originalUrl} - ${message}`);

  res.status(statusCode).json({ status: 'error', message });
};

export { errorHandler };


