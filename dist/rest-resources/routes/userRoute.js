"use strict";

const express = require('express');
const userController = require('../controllers/userController');
const {
  authenticate,
  authorizeRoles
} = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const userSchema = require('../../json-schemas/userSchema');
const userUpdatedSchema = require('../../json-schemas/userUpdatedSchema');
const router = express.Router();
router.get('/', authenticate, authorizeRoles('admin'), userController.getAllUsers);
router.get('/:id', authenticate, authorizeRoles('admin', 'doctor', 'patient'), userController.getUserById);
router.put('/:id', authenticate, validationMiddleware(userUpdatedSchema), userController.updateUser);
router.delete('/:id', authenticate, authorizeRoles('admin'), userController.deleteUser);
module.exports = router;