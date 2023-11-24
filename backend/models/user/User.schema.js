const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength:50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength:8,
        maxLength: 32,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'agent'],
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    refreshJWT: {
        token: {
            type: String,
            maxlength: 500,
            default: "",
        },
        addedAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
    },
});

module.exports = User = mongoose.model('user', UserSchema);