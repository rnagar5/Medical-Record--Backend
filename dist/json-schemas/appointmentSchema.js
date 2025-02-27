"use strict";

module.exports = {
  title: "Appointment",
  type: "object",
  required: ["doctorId", "date", "time"],
  properties: {
    doctorId: {
      type: "integer",
      minimum: 1
    },
    date: {
      type: "string",
      format: "date-time"
    },
    time: {
      type: "string",
      pattern: "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$"
    },
    notes: {
      type: "string",
      maxLength: 500
    }
  },
  additionalProperties: false
};