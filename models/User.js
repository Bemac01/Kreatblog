const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: Number,
        default: 3 // 1: Admin, 2: Editor, 3: User
    },
    verificationCode: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, 
{ timestamps: true } 
);

module.exports = mongoose.model('User', userSchema);