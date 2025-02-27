"use strict";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  User
} = require('../database/models');
const AppError = require('../errors/AppError');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15d';
const generateToken = payload => jwt.sign(payload, JWT_SECRET, {
  expiresIn: JWT_EXPIRES_IN
});
const authService = {
  signup: async _ref => {
    let {
      name,
      email,
      password,
      role
    } = _ref;
    const existingUser = await User.findOne({
      where: {
        email
      }
    });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });
    const token = generateToken({
      id: user.id,
      name: user.name,
      role: user.role
    });
    return {
      user,
      token
    };
  },
  login: async _ref2 => {
    let {
      email,
      password
    } = _ref2;
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }
    const token = generateToken({
      id: user.id,
      name: user.name,
      role: user.role
    });
    return {
      user,
      token
    };
  }
};
module.exports = authService;