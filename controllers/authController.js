const User = require('../models/User');
const { hashPassword, } = require('../utils/hashpass');
const { comparePassword } = require('../utils/comparePass');
const { generateToken } = require('../utils/generateToken');
const {generateCode} = require('../utils/generateCode');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
    try {
        
        const { username, email, password, role } = req.body;

        const hashedPassword = await hashPassword(password);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
        }   

        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully'});

    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.status(200).json({ message: 'Login successful', data: { token } });
    } catch (error) {
        next(error);
    }
};

exports.verifyCode = async (req, res, next) => {
    try {

        const { email } = req.body;
        
        const user = await User.findOne({ email });
        
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }   

        // Logic to send verification email goes here
        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        const code = generateCode(6);
        user.verificationCode = code;
        await user.save();

        //send email logic here using nodemailer or any email service provider
        await sendEmail({
            emailto: user.email,
            subject: 'Email Verification',
            code: code,
            content: 'verify your email'
        });

        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        next(error);
    }   
};


exports.verifyUserCode = async (req, res, next) => {
    try {

        const { email, code } = req.body;   
        
        const user = await User.findOne({ email });
        
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }   
        
        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }
        
        if (user.verificationCode !== code) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        user.isVerified = true;
        user.verificationCode = null;
        await user.save(); 

        res.status(200).json({ message: 'User verified successfully' });

    } catch (error) {
        next(error);
    }
};


exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }   
        const code = generateCode(6);
        user.forgotPasswordCode = code;
        await user.save();

        await sendEmail({
            emailto: user.email,
            subject: 'forget password verification',
            code: code,
            content: 'Use this code to reset your password'
        });

        res.status(200).json({ message: 'Password reset code sent to email' });
    } catch (error) {
        next(error);
    }   
};

exports.verifyForgotPasswordCode = async (req, res, next) => {
    try {
        const { email, code, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.forgotPasswordCode !== code) {
            return res.status(400).json({ message: 'Invalid code' });
        }
        user.password = await hashPassword(newPassword);
        user.forgotPasswordCode = null;
        await user.save();
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        next(error);
    }           
};

exports.updatePassword = async (req, res, next) => {
   try{
        const { currentPassword, newPassword } = req.body;

        const { email } = req.user;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await comparePassword(currentPassword, user.password);
        
        if (!isMatch) {
            res.status(400).json({ message: 'Current password is incorrect' });
        }

        if (currentPassword === newPassword) {
            res.status(400).json({ message: 'New password must be different from current password' });
        }

        user.password = await hashPassword(newPassword);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
        
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try{

    }catch (error) {
        next(error);
    }
};
