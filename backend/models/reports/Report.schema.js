const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
        maxLength: 500,
    },
    isClosed: {
        type: Boolean,
        default: false,
    },
    closedAt: {
        type: Date,
    },
    closedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    closedMessage: {
        type: String,
        maxLength: 1000,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Report = mongoose.model('report', ReportSchema);