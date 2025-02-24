const express = require('express');
const authController = require('../controllers/authController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const userSchema = require('../../json-schemas/userSchema');


const router = express.Router();

router.post('/signup', validationMiddleware(userSchema), authController.signup);
router.post('/login', authController.login); 

module.exports = router;
