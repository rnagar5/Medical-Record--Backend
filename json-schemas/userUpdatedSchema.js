module.exports = {
    title: "UserUpdate",
    type: "object",
    properties: {
      name: { type: "string", minLength: 2 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
      role: { type: "string", enum: ["doctor", "patient", "admin"] }
    },
    additionalProperties: false,
    minProperties: 1 
  };
  