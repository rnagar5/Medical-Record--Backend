import express from 'express';
import authController from '../controllers/authController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import userSchema from '../../json-schemas/userSchema.js';

const router = express.Router();

router.post('/signup', validationMiddleware(userSchema), authController.signup);
router.post('/login', authController.login);

export default router;



