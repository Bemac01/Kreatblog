const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { 
        registerValidation, 
        loginValidation, 
        emailVerificationValidation, 
        CodeValidation,
        verifyForgotPasswordCodeValidation,
        updatePasswordValidation
     } = require('../validators/auth');

const { validate } = require('../validators/validate');

const { isAuth } = require('../middlewares/isAuth');



router.post('/register', registerValidation, validate, authController.register);

router.post('/login', loginValidation, validate, authController.login);

router.post('/verification-code', emailVerificationValidation, validate, authController.verifyCode);

router.post('/verify-user', CodeValidation, validate, authController.verifyUserCode);

router.post('/forgot-password', emailVerificationValidation, validate, authController.forgotPassword);

router.post('/reset-password', verifyForgotPasswordCodeValidation, validate, authController.verifyForgotPasswordCode);

router.put('/update-password', updatePasswordValidation, validate, isAuth, authController.updatePassword);

router.put('/update-profile', isAuth, authController.updateProfile);


module.exports = router;