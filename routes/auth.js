const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation, emailVerificationValidation, CodeValidation } = require('../validators/auth');
const { validate } = require('../validators/validate');

router.post('/register', registerValidation, validate, authController.register);

router.post('/login', loginValidation, validate, authController.login);

router.post('/verification-code', emailVerificationValidation, validate, authController.verifyCode);

router.post('/verify-user', CodeValidation, validate, authController.verifyUserCode);

router.post('/forgot-password', emailVerificationValidation, validate, authController.forgotPassword);


module.exports = router;