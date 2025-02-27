import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate = (schema) => {
  const validateFn = ajv.compile(schema);

  return (req, res, next) => {
    const valid = validateFn(req.body);

    if (!valid) {
      const errors = validateFn.errors.map(err => `${err.instancePath} ${err.message}`).join(', ');
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
  };
};

export default validate;






// const Ajv = require("ajv");
// const addFormats = require("ajv-formats");

// const ajv = new Ajv({ allErrors: true });
// addFormats(ajv);

// const validate = (schema) => {
//   const validateFn = ajv.compile(schema);

//   return (req, res, next) => {
//     const valid = validateFn(req.body);

//     if (!valid) {
//       const errors = validateFn.errors.map(err => `${err.instancePath} ${err.message}`).join(", ");
//       return res.status(400).json({ message: "Validation failed", errors });
//     }

//     next();
//   };
// };

// module.exports = validate;
