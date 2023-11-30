const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    name: {
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
        minLength:8,
        maxLength: 100
    },
    role: {
        type: String,
        default: 'Agent'
    },
    rating: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
    },
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    availability: {
        type: Boolean,
        default: true
    },
    priority: {
        software: {
            type: Number,
            default: 0
        },
        hardware: {
            type: Number,
            default: 0
        },
        network: {
            type: Number,
            default: 0
        }
    }
});

module.exports = Agent = mongoose.model('Agent', AgentSchema);