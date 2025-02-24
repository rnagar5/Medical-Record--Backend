'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add patientId 
    await queryInterface.addColumn('Prescriptions', 'patientId', {
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Add prescription association to Appointment 
    await queryInterface.addConstraint('Prescriptions', {
      fields: ['appointmentId'],
      type: 'foreign key',
      name: 'fk_prescriptions_appointment', 
      references: { table: 'Appointments', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Prescriptions', 'patientId');
    await queryInterface.removeConstraint('Prescriptions', 'fk_prescriptions_appointment');
  },
};

