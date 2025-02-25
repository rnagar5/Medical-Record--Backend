const { Prescription,Appointment, User ,sequelize} = require('../database/models');
const AppError = require('../errors/AppError');

const prescriptionService = {
  createPrescription: async (data, user) => {
    const { id: doctorId } = user;
  
    const transaction = await sequelize.transaction();
    try {
      const { appointmentId, patientId, medication, dosage, instructions } = data;
  
      const appointment = await Appointment.findOne({
        where: { id: appointmentId, doctorId },
        transaction,
      });
      if (!appointment) {
        throw new AppError('Appointment not found or unauthorized', 404);
      }
  
      const patient = await User.findOne({
        where: { id: patientId, role: 'patient' },
        transaction,
      });
      if (!patient) {
        throw new AppError('Patient not found', 404);
      }
  
      const prescription = await Prescription.create(
        { appointmentId, patientId, medication, dosage, instructions },
        { transaction }
      );
  
      await transaction.commit();
      return prescription;
  
    } catch (error) {
      await transaction.rollback();
      throw new AppError(`Failed to create prescription: ${error.message}`, 400);
    }
  },
  


  getAllPrescriptions: async (limit, offset) => {
    try {
      return await Prescription.findAll({
        limit,
        offset,
        include: [
          { model: User, as: 'patient', attributes: ['id', 'name'] },
        ],
      });
    } catch (err) {
      throw new Error(`Failed to fetch prescriptions: ${err.message}`);
    }
  },
  
  
  // Fetch a prescription by its ID with patient info
  getPrescriptionById: async (id, user) => {
    const prescription = await Prescription.findByPk(id, {
      include: [
        { model: Appointment, as: 'appointment' }, 
        { model: User, as: 'patient', attributes: ['id', 'name'] }, 
      ],
    });

    if (!prescription) {
      throw new AppError('Prescription not found', 404);
    }

    const { appointment, patient } = prescription;

    const isAdmin = user.role === 'admin';
    const isDoctorInvolved = user.role === 'doctor' && appointment.doctorId === user.id;
    const isPatientInvolved = user.role === 'patient' && patient.id === user.id;

    if (!isAdmin && !isDoctorInvolved && !isPatientInvolved) {
      throw new AppError('Access denied. Only the admin, doctor, or patient involved can access.', 403);
    }

    return prescription;
  },

  updatePrescription: async (id, updates, user) => {
    const transaction = await sequelize.transaction();
    try {
      const prescription = await Prescription.findByPk(id, {
        include: [{ model: Appointment, as: 'appointment' }],
        transaction,
      });

      if (!prescription) {
        await transaction.rollback();
        throw new AppError('Prescription not found', 404);
      }

      const isAuthorized =
        user.role === 'admin' || prescription.appointment.doctorId === user.id;

      if (!isAuthorized) {
        await transaction.rollback();
        throw new AppError('Unauthorized to update this prescription', 403);
      }

      await prescription.update(updates, { transaction });
      await transaction.commit();

      return prescription;

    } catch (error) {
      await transaction.rollback();
      throw new AppError(`Failed to update prescription: ${error.message}`, 400);
    }
  },
//delete
  deletePrescription: async (id) => {
    const transaction = await sequelize.transaction();
    try {
      const prescription = await Prescription.findByPk(id, { transaction });

      if (!prescription) {
        await transaction.rollback();
        return null; 
      }

      await prescription.destroy({ transaction });
      await transaction.commit(); 

      return prescription;

    } catch (error) {
      await transaction.rollback(); 
      throw new AppError(`Failed to delete prescription: ${error.message}`, 400);
    }
  },


  
};

module.exports = prescriptionService;
