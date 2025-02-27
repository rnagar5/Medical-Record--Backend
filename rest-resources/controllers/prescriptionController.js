//  prescriptionController.js
import prescriptionService from '../../services/prescriptionService.js';
import AppError from '../../errors/AppError.js';
import logger from '../../libs/logger.js';

const prescriptionController = {
  createPrescription: async (req, res, next) => {
    try {
      const prescription = await prescriptionService.createPrescription(req.body, req.user); 
  
      res.status(201).json({
        message: 'Prescription created successfully',
        data: prescription,
      });
    } catch (error) {
      next(new AppError(`Failed to create prescription: ${error.message}`, 400));
    }
  },
  
  getAllPrescriptions: async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10; 
      const offset = parseInt(req.query.offset) || 0; 
  
      const prescriptions = await prescriptionService.getAllPrescriptions(limit, offset);
  
      if (!prescriptions.length) {
        logger.warn('No prescriptions found');
        return next(new AppError('No prescriptions available', 404)); 
      }
  
      logger.info('Fetched all prescriptions');
      res.status(200).json(prescriptions); 
    } catch (err) {
      logger.error(`Error fetching prescriptions - ${err.message}`);
      next(new AppError('Failed to fetch prescriptions', 500));
    }
  },

  getPrescriptionById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const prescription = await prescriptionService.getPrescriptionById(id, req.user);

      logger.info(`Fetched prescription with ID ${id}`);
      res.status(200).json(prescription); 
    } catch (err) {
      logger.error(`Error fetching prescription - ${err.message}`);
      next(new AppError(`Failed to fetch prescription: ${err.message}`, 500));
    }
  },

  updatePrescription: async (req, res, next) => {
    try {
      const updatedPrescription = await prescriptionService.updatePrescription(
        req.params.id,
        req.body,
        req.user 
      );

      logger.info(`Updated prescription - ID: ${req.params.id}`);
      res.json(updatedPrescription);
    } catch (err) {
      logger.error(`Error updating prescription - ${err.message}`);
      next(new AppError(err.message, err.statusCode || 400));
    }
  },

  deletePrescription: async (req, res, next) => {
    try {
      const result = await prescriptionService.deletePrescription(req.params.id);
      if (!result) {
        logger.warn(`Delete failed - Prescription not found: ID ${req.params.id}`);
        return next(new AppError('Prescription not found', 404));
      }
      logger.info(`Deleted prescription - ID: ${req.params.id}`);
      res.json({ message: 'Prescription deleted successfully' });
    } catch (err) {
      logger.error(`Error deleting prescription - ${err.message}`);
      next(new AppError('Failed to delete prescription', 400));
    }
  }
};

export default prescriptionController;

// const prescriptionService = require('../../services/prescriptionService');
// const AppError = require('../../errors/AppError');
// const logger = require('../../libs/logger');

// const prescriptionController = {
//   createPrescription: async (req, res, next) => {
//     try {
//       const prescription = await prescriptionService.createPrescription(req.body, req.user); 
  
//       res.status(201).json({
//         message: 'Prescription created successfully',
//         data: prescription,
//       });
//     } catch (error) {
//       next(new AppError(`Failed to create prescription: ${error.message}`, 400));
//     }
//   },
  
//   getAllPrescriptions: async (req, res, next) => {
//     try {
//       const limit = parseInt(req.query.limit) || 10; 
//       const offset = parseInt(req.query.offset) || 0; 
  
//       const prescriptions = await prescriptionService.getAllPrescriptions(limit, offset);
  
//       if (!prescriptions.length) {
//         logger.warn('No prescriptions found');
//         return next(new AppError('No prescriptions available', 404)); 
//       }
  
//       logger.info('Fetched all prescriptions');
//       res.status(200).json(prescriptions); 
//     } catch (err) {
//       logger.error(`Error fetching prescriptions - ${err.message}`);
//       next(new AppError('Failed to fetch prescriptions', 500));
//     }
//   },
  


//   getPrescriptionById: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const prescription = await prescriptionService.getPrescriptionById(id, req.user);

//       logger.info(`Fetched prescription with ID ${id}`);
//       res.status(200).json(prescription); 
//     } catch (err) {
//       logger.error(`Error fetching prescription - ${err.message}`);
//       next(new AppError(`Failed to fetch prescription: ${err.message}`, 500));
//     }
//   },


//   updatePrescription: async (req, res, next) => {
//     try {
//       const updatedPrescription = await prescriptionService.updatePrescription(
//         req.params.id,
//         req.body,
//         req.user 
//       );

//       logger.info(`Updated prescription - ID: ${req.params.id}`);
//       res.json(updatedPrescription);
//     } catch (err) {
//       logger.error(`Error updating prescription - ${err.message}`);
//       next(new AppError(err.message, err.statusCode || 400));
//     }
//   },

//   deletePrescription: async (req, res, next) => {
//     try {
//       const result = await prescriptionService.deletePrescription(req.params.id);
//       if (!result) {
//         logger.warn(`Delete failed - Prescription not found: ID ${req.params.id}`);
//         return next(new AppError('Prescription not found', 404));
//       }
//       logger.info(`Deleted prescription - ID: ${req.params.id}`);
//       res.json({ message: 'Prescription deleted successfully' });
//     } catch (err) {
//       logger.error(`Error deleting prescription - ${err.message}`);
//       next(new AppError('Failed to delete prescription', 400));
//     }
//   }
  
// };

// module.exports = prescriptionController;
