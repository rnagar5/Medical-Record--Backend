const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const logger = require('./libs/logger');
const { errorHandler } = require('./errors/errorHandler');
const { sequelize: db } = require('./database/models');
const authRoutes = require('./rest-resources/routes/authRoute');
const userRoutes = require('./rest-resources/routes/userRoute');
const appointmentRoutes = require('./rest-resources/routes/appointmentRoute');
const prescriptionRoutes = require('./rest-resources/routes/prescriptionRoute');

const app = express();


app.use(express.json());

app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg.trim()) } }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

app.use(errorHandler);
db.authenticate()
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
