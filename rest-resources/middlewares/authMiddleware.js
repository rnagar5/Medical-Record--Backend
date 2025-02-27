
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;


export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token required' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token);
  console.log(JWT_SECRET);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};



// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET;

// const authMiddleware = {
//   authenticate: (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Token required' });
//     }

//     const token = authHeader.split(' ')[1];
//     try {
//       req.user = jwt.verify(token, JWT_SECRET);
      
//       next();
//     } catch (err) {
//       res.status(401).json({ message: 'Invalid or expired token' });
//     }
//   },

//   authorizeRoles: (...roles) => (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     next();
//   },
// };

// module.exports = authMiddleware;
