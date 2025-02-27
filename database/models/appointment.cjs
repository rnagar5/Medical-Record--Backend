// 'use strict';
// import { DataTypes } from 'sequelize';
// import db from './index.js'; 
// const sequelize = db.sequelize;

//   const Appointment = sequelize.define('Appointment', {
//     patientId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Users',
//         key: 'id',
//       },
//       onUpdate: 'CASCADE',
//       onDelete: 'CASCADE',
//     },
//     doctorId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Users',
//         key: 'id',
//       },
//       onUpdate: 'CASCADE',
//       onDelete: 'CASCADE',
//     },
//     date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     time: {
//       type: DataTypes.TIME,
//       allowNull: false,
//     },
//     notes: {
//       type: DataTypes.STRING,
//     },
//   });

//   Appointment.associate = (models) => {
//     Appointment.belongsTo(models.User, { foreignKey: 'patientId', as: 'patient' });
//     Appointment.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctor' });
//     Appointment.hasOne(models.Prescription, { foreignKey: 'appointmentId', as: 'prescription' });
//   };



// export { Appointment};




'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Appointment = sequelize.define('Appointment', {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
    },
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, { foreignKey: 'patientId', as: 'patient' });
    Appointment.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctor' });
    Appointment.hasOne(models.Prescription, { foreignKey: 'appointmentId', as: 'prescription' }); 
  };
  
  return Appointment;
};
