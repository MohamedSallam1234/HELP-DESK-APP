const mongoose = require('mongoose');

const KnowledgeBaseSchema = new mongoose.Schema({
   question:{
       type:String,
       required:true
   },
    answer:{
      type:String,
      required:true
    },
    category:{
        type:String,
        enum: ['software', 'hardware', 'network'],
        required:true,
        default:""
    }
});
module.exports=mongoose.model("knowledgebase",KnowledgeBaseSchema);