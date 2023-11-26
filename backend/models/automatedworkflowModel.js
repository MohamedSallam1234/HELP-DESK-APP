const mongoose = require('mongoose');

const automatedWorkflowSchema = new mongoose.Schema({

    agent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    subCategory:{
        type:String,
        required:true,
        maxLength:100,
    },


   automatedWorkflow:{
       type:String,
       required:true,
       maxLength:1000,
   }
});

module.exports = mongoose.model('automatedWorkflow', automatedWorkflowSchema);
