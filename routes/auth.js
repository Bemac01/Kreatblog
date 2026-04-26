const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation } = require('../validators/auth');
const { validate } = require('../validators/validate');

router.post('/register', registerValidation, validate, authController.register);

module.exports = router;