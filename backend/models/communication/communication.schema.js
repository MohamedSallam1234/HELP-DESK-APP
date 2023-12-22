const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});
module.exports =communication =mongoose.model('communication', communicationSchema);
