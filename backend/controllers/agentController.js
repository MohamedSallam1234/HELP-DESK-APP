const automatedModel = require('../models/automatedworkflowModel')
const agentModel = require("../models/agentModel")
// create an automated solution
module.exports.createsol = async (req,res)=>{
    const {subCategory,automatedWorkflow} = req.body
    try{
        if(!subCategory || !automatedWorkflow)return res.json({mssg:"All fields need to be filled"})
        const agent = await agentModel.findOne({user:req.users._id})
        await automatedModel.create({agent:agent._id,subCategory,automatedWorkflow})
    return res.json({mssg:"Solution uploaded"})
    }catch(err){
        console.log(err);
        return res.json({mssg:"error while uploading solution"})
    }
}