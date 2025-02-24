const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const { authenticate, authorizeRoles } = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const appointmentSchema = require('../../json-schemas/appointmentSchema');
const appointmentUpdateSchema = require('../../json-schemas/appointmentUpdateSchema');

const router = express.Router();

// Apply authentication to all routes
router.use(authenticate);

// Create an appointment (Patients only)
router.post(
  '/',
  authorizeRoles('patient'),
  validationMiddleware(appointmentSchema),
  appointmentController.createAppointment
);

// Get all appointments (Admins only)
router.get(
  '/',
  authorizeRoles('admin'),
  appointmentController.getAllAppointments
);

// Get appointment by ID (Accessible by patient, doctor involved, or admin)
router.get(
  '/:id',
  authorizeRoles('patient', 'doctor', 'admin'),
  appointmentController.getAppointmentById
);

// Update appointment (Patients and doctors and admin can update their appointments)
router.put(
  '/:id',
  authorizeRoles('patient', 'doctor', 'admin'),
  validationMiddleware(appointmentUpdateSchema),
  appointmentController.updateAppointment
);

// Delete appointment (Admins only)
router.delete(
  '/:id',
  authorizeRoles('admin'),
  appointmentController.deleteAppointment
);

module.exports = router;