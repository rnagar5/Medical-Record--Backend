// userController.js
import userService from '../../services/userService.js';
import AppError from '../../errors/AppError.js';
import logger from '../../libs/logger.js';

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10; 
      const offset = parseInt(req.query.offset) || 0; 
  
      const users = await userService.getAllUsers(limit, offset);
      logger.info(`Fetched users with limit=${limit} and offset=${offset}`);
      res.json(users);
    } catch (err) {
      logger.error(`Error fetching users - ${err.message}`);
      next(new AppError('Failed to fetch users', 500));
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.user, req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const updatedUser = await userService.updateUser(req.user, req.params.id, req.body);

      logger.info(`Updated user - ID: ${req.params.id} by ${req.user.role} (ID: ${req.user.id})`);
      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (err) {
      logger.error(`Error updating user - ${err.message} | Requested by ${req.user.role} (ID: ${req.user.id})`);
      next(new AppError(err.message, err.statusCode || 400));
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const result = await userService.deleteUser(req.params.id);
      if (!result) {
        logger.warn(`Delete failed - User not found: ID ${req.params.id}`);
        return next(new AppError('User not found', 404));
      }
      logger.info(`Deleted user - ID: ${req.params.id}`);
      res.json(result);
    } catch (err) {
      logger.error(`Error deleting user - ${err.message}`);
      next(new AppError('Failed to delete user', 400));
    }
  },
};

export default userController;

// const userService = require('../../services/userService');
// const AppError = require('../../errors/AppError');
// const logger = require('../../libs/logger');

// const userController = {
//   getAllUsers: async (req, res, next) => {
//     try {
//       const limit = parseInt(req.query.limit) || 10; 
//       const offset = parseInt(req.query.offset) || 0; 
  
//       const users = await userService.getAllUsers(limit, offset);
//       logger.info(`Fetched users with limit=${limit} and offset=${offset}`);
//       res.json(users);
//     } catch (err) {
//       logger.error(`Error fetching users - ${err.message}`);
//       next(new AppError('Failed to fetch users', 500));
//     }
//   },
  

//   getUserById: async (req, res, next) => {
//     try {
//       const user = await userService.getUserById(req.user, req.params.id); // Passing logged-in user & target user ID
//       res.status(200).json(user);
//     } catch (err) {
//       next(err);
//     }
//   },
  

//   updateUser: async (req, res, next) => {
//     try {
//       const updatedUser = await userService.updateUser(req.user, req.params.id, req.body);

//       logger.info(`Updated user - ID: ${req.params.id} by ${req.user.role} (ID: ${req.user.id})`);
//       res.status(200).json({
//         message: 'User updated successfully',
//         user: updatedUser,
//       });
//     } catch (err) {
//       logger.error(`Error updating user - ${err.message} | Requested by ${req.user.role} (ID: ${req.user.id})`);
//       next(new AppError(err.message, err.statusCode || 400));
//     }
//   },

//   deleteUser: async (req, res, next) => {
//     try {
//       const result = await userService.deleteUser(req.params.id);
//       if (!result) {
//         logger.warn(`Delete failed - User not found: ID ${req.params.id}`);
//         return next(new AppError('User not found', 404));
//       }
//       logger.info(`Deleted user - ID: ${req.params.id}`);
//       res.json(result);
//     } catch (err) {
//       logger.error(`Error deleting user - ${err.message}`);
//       next(new AppError('Failed to delete user', 400));
//     }
//   },
// };

// module.exports = userController;
