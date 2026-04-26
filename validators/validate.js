const {validationResult} = require('express-validator');

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    const errorMapped = {};

    if(Object.keys(errors).length > 0) {
        next();
    } else {
        errors.errors.map(err => {
            errorMapped[err.path] = err.msg;
        })
        res.status(400).json({
            statusCode: 400,    
            success: false,
            message: 'Validation Error',
            errors: errorMapped
        });
    }
}