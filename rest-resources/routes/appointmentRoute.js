import express from 'express';
import appointmentController from '../controllers/appointmentController.js';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import appointmentSchema from '../../json-schemas/appointmentSchema.js';
import appointmentUpdateSchema from '../../json-schemas/appointmentUpdateSchema.js';

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

// Update appointment (Patients, doctors, and admins can update their appointments)
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

export default router;




