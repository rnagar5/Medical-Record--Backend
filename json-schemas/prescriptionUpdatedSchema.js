module.exports = {
    title: "Prescription Update",
    type: "object",
    properties: {
      medication: { type: "string", minLength: 2 },
      dosage: { type: "string", minLength: 1 },
      instructions: { type: "string", maxLength: 500 },
    },
    required: [], 
    additionalProperties: false,
    anyOf: [
      { required: ["medication"] },
      { required: ["dosage"] },
      { required: ["instructions"] },
    ],
  };
  