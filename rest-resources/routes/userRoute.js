import express from 'express';
import userController from '../controllers/userController.js';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import userSchema from '../../json-schemas/userSchema.js';
import userUpdatedSchema from '../../json-schemas/userUpdatedSchema.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('admin'), userController.getAllUsers);

router.get('/:id', authenticate, authorizeRoles('admin', 'doctor', 'patient'), userController.getUserById);

router.put(
  '/:id',
  authenticate, 
  validationMiddleware(userUpdatedSchema), 
  userController.updateUser
);

router.delete('/:id', authenticate, authorizeRoles('admin'), userController.deleteUser);

export default router;

