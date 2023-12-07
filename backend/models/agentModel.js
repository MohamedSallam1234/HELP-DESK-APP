const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tickets_queue: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    availability: {
        type: Number,
        required:true,
        default: 0
    },
    major: {
     type :String,
     required:true,
     default:"software"
    }
});


module.exports = mongoose.model('Agent', AgentSchema);
