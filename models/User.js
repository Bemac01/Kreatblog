const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 3 // 1: Admin, 2: Editor, 3: User
    }
}, 
{ timestamps: true } 
);

module.exports = mongoose.model('User', userSchema);