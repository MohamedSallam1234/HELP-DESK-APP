const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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


module.exports = mongoose.model('Agent', AgentSchema);
