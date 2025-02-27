import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../database/models/index.js';
import AppError from '../errors/AppError.js';

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15d';

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const authService = {
  signup: async ({ name, email, password, role }) => {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({ name, email, password: hashedPassword, role });
    

    return { user};
  },

  login: async ({ email, password }) => {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken({ id: user.id, name: user.name, role: user.role });
    return { user, token };
  },
};

export default authService;


