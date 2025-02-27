// 'use strict';
// import { DataTypes } from 'sequelize';
// import db from './index.js'; 
// const sequelize = db.sequelize;

// // Define the User model directly using sequelize
// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: { isEmail: true },
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.ENUM('doctor', 'patient', 'admin'),
//     allowNull: false,
//     defaultValue: 'patient',
//   },
// });

// // Set up associations (if needed)
// User.associate = (models) => {
//   User.hasMany(models.Appointment, { foreignKey: 'patientId', as: 'appointments' });
//   User.hasMany(models.Appointment, { foreignKey: 'doctorId', as: 'doctorAppointments' });
//   User.hasMany(models.Prescription, { foreignKey: 'patientId', as: 'prescriptions' });
// };

// export {User};  // Export the User model




'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('doctor', 'patient', 'admin'),
      allowNull: false,
      defaultValue: 'patient',
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Appointment, { foreignKey: 'patientId', as: 'appointments' });
    User.hasMany(models.Appointment, { foreignKey: 'doctorId', as: 'doctorAppointments' });
    User.hasMany(models.Prescription, { foreignKey: 'patientId', as: 'prescriptions' });
  };

  return User;
};
