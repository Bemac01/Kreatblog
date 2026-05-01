const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/keys');



exports.isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization ? req.headers.authorization.split(' ') : [];
        const token = authHeader.length > 1 ? authHeader[1] : null;

        if(token){
            const payload = jwt.verify(token, jwt_secret);

            if(payload){
                req.user = {
                    _id: payload._id,
                    username: payload.username,
                    email: payload.email,
                    role: payload.role
                }
                next();
            }else{
                res.status(401).json({ message: 'Invalid token' });
            }
        }else {
            res.status(400).json({ message: 'token is required' });
        }

    }catch (error) { 
            next(error);
    }
}
