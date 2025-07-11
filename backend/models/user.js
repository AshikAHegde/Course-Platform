const mongoose = require('mongoose')
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
        required: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    email_verify_number: {
        type: Number,
        default: Math.floor(Math.random() * 1000000),
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


