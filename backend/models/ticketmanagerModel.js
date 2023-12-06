const mongoose = require("mongoose")

const ticketmangerSchema = new mongoose.Schema({
   
   Manager_number:{
           type:Number,
           required:true,
           default:1
   },
   
    high_priority: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    medium_priority: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    low_priority: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ]
})

module.exports = mongoose.model('ticketmanger', ticketmangerSchema);