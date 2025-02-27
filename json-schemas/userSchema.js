export default {
  title: "User",
  type: "object",
  required: ["name", "email", "password", "role"],
  properties: {
    name: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    role: { type: "string", enum: ["doctor", "patient", "admin"] }
  },
  additionalProperties: false,
};

// module.exports = {
//     title: "User",
//     type: "object",
//     required: ["name", "email", "password", "role"],
//     properties: {
//       name: { type: "string", minLength: 2 },
//       email: { type: "string", format: "email" },
//       password: { type: "string", minLength: 6 },
//       role: { type: "string", enum: ["doctor", "patient", "admin"] }
//     },
//     additionalProperties: false
//   };
  