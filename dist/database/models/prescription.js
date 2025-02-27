'use strict';

const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const Prescription = sequelize.define('Prescription', {
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Appointments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    medication: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dosage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: {
      type: DataTypes.STRING
    }
  });
  Prescription.associate = models => {
    Prescription.belongsTo(models.Appointment, {
      foreignKey: 'appointmentId',
      as: 'appointment'
    });
    Prescription.belongsTo(models.User, {
      foreignKey: 'patientId',
      as: 'patient'
    });
  };
  return Prescription;
};