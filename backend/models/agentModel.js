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
    tickets_queue: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    availability: {
        type: Number,
        default: 5
    },
    major: {
     type :String,
     default:"software"
    }
});


module.exports = mongoose.model('Agent', AgentSchema);
