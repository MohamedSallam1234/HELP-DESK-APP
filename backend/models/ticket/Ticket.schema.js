const mongoose= require ('mongoose');

const TicketSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    agent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Agent'
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
    priority:{
      type:String,
      enum:['low','medium','high'],
      required:true,
    },
    status:{
      type:String,
      maxLength: 100,
      required:true,
      enum:['Pending','Open','Closed'],
      default:'Pending'
    },

    openAt:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    informationAboutTicketUserToAgent: [
        {
            sender: {
                type: String,
                maxlength: 50,
                required: true,
                default: "",
                ref:'User',
            },
            message: {
                type: String,
                maxlength: 1000,
                required: true,
                default: "",
            },
            msgAt: {
                type: Date,
                required: true,
                default: Date.now(),
            },
        },
    ],
});

module.exports= Ticket= mongoose.model('ticket',TicketSchema);






