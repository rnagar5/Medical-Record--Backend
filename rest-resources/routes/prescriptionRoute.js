import express from 'express';
import prescriptionController from '../controllers/prescriptionController.js';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import prescriptionSchema from '../../json-schemas/prescriptionSchema.js';
import prescriptionUpdatedSchema from '../../json-schemas/prescriptionUpdatedSchema.js';

const router = express.Router();

router.use(authenticate);

// Create prescription
router.post(
  '/',
  authorizeRoles('doctor'),
  validationMiddleware(prescriptionSchema),
  prescriptionController.createPrescription
);

// Get all prescriptions
router.get(
  '/',
  authorizeRoles('admin'),
  prescriptionController.getAllPrescriptions
);

// Get prescription by ID
router.get(
  '/:id',
  authorizeRoles('doctor', 'patient', 'admin'),
  prescriptionController.getPrescriptionById
);

// Update prescription
router.put(
  '/:id',
  authorizeRoles('doctor', 'admin'),
  validationMiddleware(prescriptionUpdatedSchema),
  prescriptionController.updatePrescription
);

// Delete prescription
router.delete(
  '/:id',
  authorizeRoles('admin'),
  prescriptionController.deletePrescription
);

export default router;






// const express = require('express');
// const prescriptionController = require('../controllers/prescriptionController');
// const { authenticate, authorizeRoles } = require('../middlewares/authMiddleware');
// const validationMiddleware = require('../middlewares/validationMiddleware');
// const prescriptionSchema = require('../../json-schemas/prescriptionSchema');
// const prescriptionUpdatedSchema = require('../../json-schemas/prescriptionUpdatedSchema');

// const router = express.Router();

// router.use(authenticate);

// // Create prescription
// router.post(
//   '/',                                  
//   authorizeRoles('doctor'),              
//   validationMiddleware(prescriptionSchema),
//   prescriptionController.createPrescription 
// );


// // Get all prescriptions
// router.get(
//   '/',                     
//   authorizeRoles('admin'), 
//   prescriptionController.getAllPrescriptions
// );

// // Get prescription by ID
// router.get(
//   '/:id',
//   authorizeRoles('doctor', 'patient', 'admin'),
//   prescriptionController.getPrescriptionById
// );

// // Update prescription
// router.put(
//   '/:id',
//   authorizeRoles('doctor', 'admin'),
//   validationMiddleware(prescriptionUpdatedSchema),
//   prescriptionController.updatePrescription
// );

// // Delete prescription
// router.delete(
//   '/:id',
//   authorizeRoles('admin'), 
//   prescriptionController.deletePrescription
// );
// module.exports = router;

