module.exports = {
    title: "Appointment",
    type: "object",
    required: ["patientId", "doctorId", "date", "time"],
    properties: {
      patientId: { type: "integer", minimum: 1 },
      doctorId: { type: "integer", minimum: 1 },
      date: { type: "string", format: "date-time" },
      time: { type: "string", pattern: "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$" },
      notes: { type: "string", maxLength: 500 }
    },
    additionalProperties: false
  };
  