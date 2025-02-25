
const appointmentService = require('../../services/appointmentService');
const AppError = require('../../errors/AppError');

const appointmentController = {
  // Create an appointment

  createAppointment: async (req, res, next) => {
    try {
      const appointment = await appointmentService.createAppointment(req.body, req.user);
      res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
      next(error);
    }
  },
  
  // createAppointment: async (req, res, next) => {
  //   try {
  //     const { patientId, doctorId, date, time, notes } = req.body;
  
  //     if (req.user.role === 'patient' && req.user.id !== patientId) {
  //       throw new AppError('You can only create appointments for yourself.', 403);
  //     }
  
  //     const appointment = await appointmentService.createAppointment({ patientId, doctorId, date, time, notes });
  //     res.status(201).json({ message: 'Appointment created successfully', appointment });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  
  // Get all appointments (Admin only)
  getAllAppointments: async (req, res, next) => {
    try {
      if (req.user.role !== 'admin') {
        return next(new AppError('Access denied. Admins only.', 403));
      }
  
      const limit = parseInt(req.query.limit) || 10;   
      const offset = parseInt(req.query.offset) || 0;  
  
      const appointments = await appointmentService.getAllAppointments(limit, offset); 
      res.status(200).json(appointments);
    } catch (error) {
      next(new AppError(`Failed to fetch appointments: ${error.message}`, 500));
    }
  },


  // Get appointment by ID (Accessible by patient, doctor involved, or admin)
  getAppointmentById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { user } = req;
  
      const appointment = await appointmentService.getAppointmentById(id, user); 
      res.json(appointment);
    } catch (error) {
      next(new AppError(`Failed to fetch appointment: ${error.message}`, 500));
    }
  },
  

  // Update appointment 
  updateAppointment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedAppointment = await appointmentService.updateAppointment(id, req.body, req.user);
  
      if (!updatedAppointment) {
        return next(new AppError('Appointment not found', 404));
      }
  
      res.json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (error) {
      next(error);
    }
  },
  

  // Delete appointment (Admin only)
  deleteAppointment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedAppointment = await appointmentService.deleteAppointment(id, req.user);
  
      if (!deletedAppointment) {
        return next(new AppError('Appointment not found', 404));
      }
  
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      next(new AppError(`Failed to delete appointment: ${error.message}`, 400));
    }
  },
  
};

module.exports = appointmentController;







