const User = require('../models/User');
const { hashPassword, } = require('../utils/hashpass');
const { comparePassword } = require('../utils/comparePass');
const { generateToken } = require('../utils/generateToken');
const {generateCode} = require('../utils/generateCode');

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

exports.sendVerificationEmail = async (req, res, next) => {
    try {

        const { email } = req.body;
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }   

        // Logic to send verification email goes here
        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        const code = generateCode(6);
        user.verificationCode = code;
        await user.save();

        //send email logic here using nodemailer or any email service provider

        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        next(error);
    }   
};
