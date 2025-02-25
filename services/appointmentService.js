const { Appointment, User, Prescription,sequelize } = require('../database/models');
const AppError = require('../errors/AppError');

const appointmentService = {
  createAppointment: async ({ doctorId, date, time, notes }, user) => {
    const transaction = await sequelize.transaction();
    try {
      const appointment = await Appointment.create(
        {
          patientId: user.id, 
          doctorId,
          date,
          time,
          notes,
        },
        { transaction }
      );
  
      await transaction.commit();
      return appointment;
    } catch (error) {
      await transaction.rollback();
      throw new AppError(`Failed to create appointment: ${error.message}`, 400);
    }
  },
  


  // Get all appointments (Admin only)

  getAllAppointments: async (limit = 10, offset = 0) => {
    try {
      return await Appointment.findAll({
        limit,
        offset,
        include: [
          { model: User, as: 'patient', attributes: ['id', 'name'] },
          { model: User, as: 'doctor', attributes: ['id', 'name'] },
          { model: Prescription, as: 'prescription' },
        ],
      });
    } catch (error) {
      throw new AppError(`Failed to fetch appointments: ${error.message}`, 400);
    }
  },
  
  
  // Get appointment by ID (Accessible by the patient, doctor involved, or admin)
  getAppointmentById: async (id, user) => {
    try {
      const appointment = await Appointment.findByPk(id, {
        include: [
          { model: User, as: 'patient', attributes: ['id', 'name'] },
          { model: User, as: 'doctor', attributes: ['id', 'name'] },
          { model: Prescription, as: 'prescription' },
        ],
      });
  
      if (!appointment) {
        throw new AppError('Appointment not found', 404);
      }
  
      if (
        user.role !== 'admin' &&
        user.id !== appointment.patientId &&
        user.id !== appointment.doctorId
      ) {
        throw new AppError('Access denied. You are not authorized to view this appointment.', 403);
      }
  
      return appointment; // 
    } catch (error) {
      throw new AppError(`Failed to retrieve appointment: ${error.message}`, 400);
    }
  },
  updateAppointment: async (id, updates, user) => {
    const transaction = await sequelize.transaction();
    try {
      const appointment = await Appointment.findByPk(id, { transaction });

      if (!appointment) {
        await transaction.rollback();
        throw new AppError('Appointment not found', 404);
      }

      const isAuthorized =
        user.role === 'admin' ||
        user.id === appointment.patientId ||
        user.id === appointment.doctorId;

      if (!isAuthorized) {
        await transaction.rollback();
        throw new AppError('Access denied. Only the admin, patient, or doctor involved can update this appointment.', 403);
      }

      await appointment.update(updates, { transaction });
      await transaction.commit();

      return appointment;

    } catch (error) {
      await transaction.rollback();
      throw new AppError(`Failed to update appointment: ${error.message}`, 400);
    }
  },

  // Delete appointment (Admin only) with transaction
  deleteAppointment: async (id, user) => {
    const transaction = await sequelize.transaction();
    try {
      if (user.role !== 'admin') {
        await transaction.rollback();
        throw new AppError('Access denied. Admins only.', 403);
      }

      const appointment = await Appointment.findByPk(id, { transaction });
      if (!appointment) {
        await transaction.rollback();
        throw new AppError('Appointment not found', 404);
      }

      await appointment.destroy({ transaction });
      await transaction.commit();

      return appointment;

    } catch (error) {
      await transaction.rollback();
      throw new AppError(`Failed to delete appointment: ${error.message}`, 400);
    }
  },

  
};

module.exports = appointmentService;







