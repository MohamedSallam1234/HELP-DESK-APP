const mongoose= require ('mongoose');

const TicketSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    agent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    issueType:{
        type:String,
        enum: ['software','hardware','network'],
        required:true
    },
    subCategory:{
      type:String,
      required:true,
      maxLength:100,
    },
    // low , medium , high
    priority:{
      type:String,
      required:true,
    },
    status:{
      type:String,
      maxLength: 100,
      required:true,
      enum:['open','pending','closed'],
      default:'open'
    },
    
    ticket_rating:{
        type:Number,
        min:0,
        max:5,
        default:undefined,
    },
    mssg:{
        type:String,
        maxLength:1000,
        required:true
    },


    resolution:{
        type:String,
        maxLength:1000,
        default:"",
    },
    openAt:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    closedAt:{
        type:Date,
        required:true,
        default:Date.now(),
    }
})

module.exports= mongoose.model('ticket',TicketSchema);






