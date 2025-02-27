"use strict";

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = {
  authenticate: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token required'
      });
    }
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({
        message: 'Invalid or expired token'
      });
    }
  },
  authorizeRoles: function () {
    for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
      roles[_key] = arguments[_key];
    }
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: 'Access denied'
        });
      }
      next();
    };
  }
};
module.exports = authMiddleware;