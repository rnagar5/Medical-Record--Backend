"use strict";

const {
  createLogger,
  format,
  transports
} = require('winston');
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), format.errors({
    stack: true
  }), format.printf(_ref => {
    let {
      timestamp,
      level,
      message,
      stack
    } = _ref;
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
  })),
  transports: [new transports.Console(), new transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }), new transports.File({
    filename: 'logs/combined.log'
  })]
});
module.exports = logger;