const {validationResult} = require('express-validator');

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    const errorMapped = {};

    if(Object.keys(errors.errors).length === 0) {
        next();
    } else {
        errors.errors.map(error => {
            errorMapped[error.path] = error.msg;
        })
        res.status(400).json(errorMapped);
    }
}