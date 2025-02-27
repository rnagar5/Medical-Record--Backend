
import db from '../database/models/index.js';
import AppError from '../errors/AppError.js';
const sequelize = db.sequelize;
const userService = {
  getAllUsers: async (limit = 10, offset = 0) => {
    return await db.User.findAll({
      attributes: { exclude: ['password'] },
      limit,
      offset,
    });
  },

  getUserById: async (requestingUser, userId) => {
    const user = await db.User.findByPk(userId, { attributes: { exclude: ['password'] } });
    if (!user) throw new AppError('User not found', 404);

    const { id: requesterId, role: requesterRole } = requestingUser;

    if (requesterRole === 'admin') return user;
    if (requesterRole === 'doctor' && user.role === 'patient') return user;
    if (requesterRole === 'patient' && requesterId === user.id) return user;
    
    throw new AppError('Unauthorized access', 403);
  },

  updateUser: async (loggedInUser, targetUserId, updateData) => {
    const transaction = await sequelize.transaction();
    try {
      const user = await db.User.findByPk(targetUserId, { transaction });
      if (!user) throw new AppError('User not found', 404);

      if (loggedInUser.role === 'admin' || (loggedInUser.role === 'patient' && loggedInUser.id === user.id)) {
        await user.update(updateData, { transaction });
        await transaction.commit();
        return user;
      }
      
      throw new AppError('You are not authorized to update this user', 403);
    } catch (err) {
      await transaction.rollback();
      throw new AppError(`Failed to update user: ${err.message}`, 500);
    }
  },

  deleteUser: async (id) => {
    const transaction = await sequelize.transaction();
    try {
      const user = await db.User.findByPk(id, { transaction });
      if (!user) throw new AppError('User not found', 404);

      await user.destroy({ transaction });
      await transaction.commit();
      return { message: 'User deleted successfully' };
    } catch (err) {
      await transaction.rollback();
      throw new AppError(`Failed to delete user: ${err.message}`, 500);
    }
  },
};

export default userService;



// const { User,sequelize } = require('../database/models');
// const AppError = require('../errors/AppError');

// const userService = {
//   getAllUsers: async (limit = 10, offset = 0) => {
//     return await User.findAll({
//       attributes: { exclude: ['password'] },
//       limit,
//       offset,
//     });
//   },
  

//   getUserById: async (requestingUser, userId) => {
//     const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
//     if (!user) throw new AppError('User not found', 404);
  
//     const { id: requesterId, role: requesterRole } = requestingUser;
  
//     if (requesterRole === 'admin') {
//       return user; // Admin can access any user
//     }
  
//     if (requesterRole === 'doctor') {
//       if (user.role === 'patient') return user; // Doctor can access patients
//       throw new AppError('Doctors can only access patient information', 403);
//     }
  
//     if (requesterRole === 'patient') {
//       if (requesterId === user.id) return user; // Patients can access their own info
//       throw new AppError('Patients can only access their own information', 403);
//     }
  
//     throw new AppError('Unauthorized access', 403);
//   },

//   updateUser: async (loggedInUser, targetUserId, updateData) => {
//     const transaction = await sequelize.transaction();
//     try {
//       const user = await User.findByPk(targetUserId, { transaction });
//       if (!user) throw new AppError('User not found', 404);

//       // Admin can update any user
//       if (loggedInUser.role === 'admin') {
//         await user.update(updateData, { transaction });
//         await transaction.commit();
//         return user;
//       }

//       // Patient can only update their own profile
//       if (loggedInUser.role === 'patient' && loggedInUser.id === user.id) {
//         await user.update(updateData, { transaction });
//         await transaction.commit();
//         return user;
//       }

//       await transaction.rollback();
//       throw new AppError('You are not authorized to update this user', 403);

//     } catch (err) {
//       await transaction.rollback();
//       throw new AppError(`Failed to update user: ${err.message}`, 500);
//     }
//   },

//   deleteUser: async (id) => {
//     const transaction = await sequelize.transaction();
//     try {
//       const user = await User.findByPk(id, { transaction });
//       if (!user) throw new AppError('User not found', 404);

//       await user.destroy({ transaction });
//       await transaction.commit();

//       return { message: 'User deleted successfully' };

//     } catch (err) {
//       await transaction.rollback();
//       throw new AppError(`Failed to delete user: ${err.message}`, 500);
//     }
//   },
  
// };

// module.exports = userService;
