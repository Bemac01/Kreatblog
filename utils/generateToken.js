const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys');

exports.generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    };
    const secret = jwt_secret;
    const options = { expiresIn: '1h' };  

    return jwt.sign(payload, secret, options);
};