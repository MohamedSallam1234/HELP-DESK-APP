const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    ticket_status:{
        type: String,
        maxLength: 100,
        required: true,
        enum: ['Pending', 'Open', 'Closed'],
        default: 'Pending'
    },
    agent_performance:{
        type:string,
        default:"No agent"
    },

    resolution_time: {
        type: string,
        default: "pending",
    },
    message: {
        type: String,
        maxlength: 1000,
        required: true,
        default: ''
    },
});

module.exports =  mongoose.model('report', ReportSchema);