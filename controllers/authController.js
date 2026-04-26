const User = require('../models/User');


exports.register = async (req, res, next) => {
    try {
        
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
        }   

        const user = new User({ username, email, password, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully'});

    } catch (error) {
        next(error);
    }
};
