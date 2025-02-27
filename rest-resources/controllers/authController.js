import authService from '../../services/authService.js';
import AppError from '../../errors/AppError.js';
import logger from '../../libs/logger.js';

const authController = {
  signup: async (req, res, next) => {
    try {
      const { user, token } = await authService.signup(req.body);
      logger.info(`User signed up: ${user.email}`);
      res.status(201).json({
        message: 'Signup successful',
        user: { id: user.id, email: user.email, role: user.role },
        token,
      });
    } catch (err) {
      logger.error(`Signup failed - ${err.message}`);
      next(new AppError(err.message, 400));
    }
  },

  login: async (req, res, next) => {
    try {
      const { user, token } = await authService.login(req.body);
      logger.info(`User logged in: ${user.email}`);
      res.status(200).json({
        message: 'Login successful',
        user: { id: user.id, email: user.email, role: user.role },
        token,
      });
    } catch (err) {
      logger.error(`Login failed - ${err.message}`);
      next(new AppError(err.message, 400));
    }
  },
};

export default authController;



// const authService = require('../../services/authService');
// const AppError = require('../../errors/AppError');
// const logger = require('../../libs/logger');

// const authController = {
//   signup: async (req, res, next) => {
//     try {
//       const { user, token } = await authService.signup(req.body);
//       logger.info(`User signed up: ${user.email}`);
//       res.status(201).json({
//         message: 'Signup successful',
//         user: { id: user.id, email: user.email, role: user.role },
//         token,
//       });
//     } catch (err) {
//       logger.error(`Signup failed - ${err.message}`);
//       next(new AppError(err.message, 400));
//     }
//   },

//   login: async (req, res, next) => {
//     try {
//       const { user, token } = await authService.login(req.body);
//       logger.info(`User logged in: ${user.email}`);
//       res.status(200).json({
//         message: 'Login successful',
//         user: { id: user.id, email: user.email, role: user.role },
//         token,
//       });
//     } catch (err) {
//       logger.error(`Login failed - ${err.message}`);
//       next(new AppError(err.message, 400));
//     }
//   },
// };

// module.exports = authController;
