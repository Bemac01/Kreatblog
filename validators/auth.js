const {check} = require('express-validator');



exports.registerValidation = [
    check('username')
        .notEmpty()
        .withMessage('Username is required')
         .isLength({ min: 6 })
        .withMessage('Username must be at least 6 characters'),

    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
        
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
];


exports.loginValidation = [
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('invalid email'),

    check('password')
        .notEmpty()
        .withMessage('Password is required')
];


exports.emailVerificationValidation = [
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('invalid email')
];

exports.CodeValidation = [
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('invalid email'),
    check('code')
        .notEmpty()
        .withMessage('Verification code is required')
        .isLength({ min: 6, max: 6 })
        .withMessage('Verification code must be 6 characters long')
];


exports.verifyForgotPasswordCodeValidation = [
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('invalid email'),
    check('code')
        .notEmpty()
        .withMessage('Verification code is required')
        .isLength({ min: 6, max: 6 })
        .withMessage('Verification code must be 6 characters long'),
    check('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
];


exports.updatePasswordValidation = [
    check('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    check('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
];
