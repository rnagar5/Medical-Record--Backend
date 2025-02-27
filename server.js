import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import logger from './libs/logger.js';
import { errorHandler } from './errors/errorHandler.js';
import db from './database/models/index.js';
import authRoutes from './rest-resources/routes/authRoute.js';
import userRoutes from './rest-resources/routes/userRoute.js';
import appointmentRoutes from './rest-resources/routes/appointmentRoute.js';
import prescriptionRoutes from './rest-resources/routes/prescriptionRoute.js';
const sequelize = db.sequelize;
const app = express();

app.use(express.json());

app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg.trim()) } }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

app.use(errorHandler);


sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  });

export default app;


// const dotenv = require('dotenv');
// dotenv.config();
// const express = require('express');
// const morgan = require('morgan');
// const logger = require('./libs/logger');
// const { errorHandler } = require('./errors/errorHandler');
// const { sequelize: db } = require('./database/models');
// const authRoutes = require('./rest-resources/routes/authRoute');
// const userRoutes = require('./rest-resources/routes/userRoute');
// const appointmentRoutes = require('./rest-resources/routes/appointmentRoute');
// const prescriptionRoutes = require('./rest-resources/routes/prescriptionRoute');

// const app = express();


// app.use(express.json());

// app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg.trim()) } }));

// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/prescriptions', prescriptionRoutes);

// app.use(errorHandler);
// db.authenticate()
//   .then(() => {
//     console.log('Database connected successfully');
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`Server running on port ${process.env.PORT || 5000}`);
//     });
//   })
//   .catch((err) => {
//     console.error(`Database connection failed: ${err.message}`);
//     process.exit(1);
//   });
