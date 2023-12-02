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
    tickets_high: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    tickets_medium: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    tickets_low: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    availability: {
        type: Boolean,
        default: true
    },
    workinghours:{
      type:Number,
      default:10
    },
    major: {
     type :String,
     default:"software"
    }
});


module.exports = mongoose.model('Agent', AgentSchema);
