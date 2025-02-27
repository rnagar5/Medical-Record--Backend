export default {
  title: "Prescription",
  type: "object",
  required: ["appointmentId", "patientId", "medication", "dosage"],
  properties: {
    appointmentId: { type: "integer", minimum: 1 },
    patientId: { type: "integer", minimum: 1 },
    medication: { type: "string", minLength: 2 },
    dosage: { type: "string", minLength: 1 },
    instructions: { type: "string", maxLength: 500 },
  },
  additionalProperties: false,
};


// module.exports = {
//     title: "Prescription",
//     type: "object",
//     required: ["appointmentId", "patientId", "medication", "dosage"],
//     properties: {
//       appointmentId: { type: "integer", minimum: 1 },
//       patientId: { type: "integer", minimum: 1 },
//       medication: { type: "string", minLength: 2 },
//       dosage: { type: "string", minLength: 1 },
//       instructions: { type: "string", maxLength: 500 },
//     },
//     additionalProperties: false,
//   };
  