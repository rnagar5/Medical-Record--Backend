const appointmentUpdateSchema = {
    type: 'object',
    properties: {
      doctorId: { type: 'integer' },
      date: { type: 'string', format: 'date-time' },
      time: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$' },
      notes: { type: 'string' }
    },
    minProperties: 1, 
    additionalProperties: false
  };
  
  module.exports = appointmentUpdateSchema;
  