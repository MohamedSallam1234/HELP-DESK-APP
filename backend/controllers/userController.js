const userModle = require("../models/userModel")
const KonwledgeModle = require("../models/knowledgeModel")
const knowledgeModel = require("../models/knowledgeModel")
const agentModel = require("../models/agentModel")
const ticketModel = require("../models/ticketModel")
const automatedModel = require("../models/automatedworkflowModel")


// update user info
module.exports.update = async (req,res)=>{
const {email,password,name} = req.body
try{
    if(!email || !password || !name)return res.json({mssg:"All fields should be filled"})

    const user = await userModle.findOne({email})
    
    if(user)return res.json({mssg:"Email is not avalible"})

    await userModle.updateOne({_id:req.user._id},{$set:{email:email,name:name,password:password}})
    return res.json({mssg:`${name}'s profile has been updated`})

}catch(err){
  console.log(err)
  res.json({mssg:"Error in update"})
}
}

// Get data from the Knowledgebase
module.exports.Konwledge_base = async(req,res)=>{
  const{category} = req.body
  try{
    if(category == ""){
      const all_data = await KonwledgeModle.find({})
      return res.json(all_data)
    }
    const data = await knowledgeModel.find({category})
    return res.json(data)
  }catch(err){
      console.log(err)
      res.status(500).send('Server Error')
  }
}

// create a ticket

module.exports.sendTicket = async (req,res)=>{
  const{issueType,subCategory,priority,mssg} = req.body
  try{
    if(!issueType || !subCategory || !priority || !mssg)return res.json({mssg:"All fields are needed"})
     
    if(issueType == "software"){
      const agent = await agentModel.findOne({major:issueType})
      if(agent.workinghours < 9){
        const ticket = await ticketModel.create({user:req.user._id,agent:agent._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent._id},{$push:{tickets_low:ticket._id}})
      }
      // the other two agents
      const agent_hardware = await agentModel.findOne({major:"hardware"})
      const agent_network = await agentModel.findOne({major:"network"})
 
      //check if he finished his 90% hours for hardware 
      if(agent_hardware.workinghours>=9 && agent_hardware.workinghours<10){

        const ticket = await ticketModel.create({user:req.user._id,agent:agent_hardware._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent_hardware._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent_hardware._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent_hardware._id},{$push:{tickets_low:ticket._id}})

      }else if(agent_network.workinghours >= 9 && agent_network.workinghours<10){

        const ticket = await ticketModel.create({user:req.user._id,agent:agent_network._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent_network._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent_network._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent_network._id},{$push:{tickets_low:ticket._id}})
      }else{
        
        //if there is no one avalible then put it any way in software agent
        const ticket = await ticketModel.create({user:req.user._id,agent:agent._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent._id},{$push:{tickets_low:ticket._id}})
      }
      return res.json({mssg:"Your Request is sent"})
    }


    else if(issueType == "hardware"){

      const agent = await agentModel.findOne({major:issueType})
      if(agent.workinghours < 9){
        const ticket = await ticketModel.create({user:req.user._id,agent:agent._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent._id},{$push:{tickets_low:ticket._id}})
      }
      // the other two agents
      const agent_software = await agentModel.findOne({major:"software"})
      const agent_network = await agentModel.findOne({major:"network"})
 
      //check if he finished his 90% hours for hardware 
      if(agent_software.workinghours>=9 && agent_software.workinghours<10){

        const ticket = await ticketModel.create({user:req.user._id,agent:agent_software._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent_software._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent_software._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent_software._id},{$push:{tickets_low:ticket._id}})

      }else if(agent_network.workinghours >= 9 && agent_network.workinghours<10){

        const ticket = await ticketModel.create({user:req.user._id,agent:agent_network._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent_network._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent_network._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent_network._id},{$push:{tickets_low:ticket._id}})
      }else{
        
        //if there is no one avalible then put it any way in software agent
        const ticket = await ticketModel.create({user:req.user._id,agent:agent._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent._id},{$push:{tickets_low:ticket._id}})
      }
      return res.json({mssg:"Your Request is sent"})

    }else{

      const agent = await agentModel.findOne({major:issueType})
      if(agent.workinghours < 9){
        const ticket = await ticketModel.create({user:req.user._id,agent:agent._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent._id},{$push:{tickets_low:ticket._id}})
      }
      // the other two agents
      const agent_hardware = await agentModel.findOne({major:"hardware"})
      const agent_software = await agentModel.findOne({major:"software"})
 
      //check if he finished his 90% hours for hardware 
      if(agent_hardware.workinghours>=9 && agent_hardware.workinghours<10){

        const ticket = await ticketModel.create({user:req.user._id,agent:agent_hardware._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent_hardware._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent_hardware._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent_hardware._id},{$push:{tickets_low:ticket._id}})

      }else if(agent_software.workinghours >= 9 && agent_software.workinghours<10){

        const ticket = await ticketModel.create({user:req.user._id,agent:agent_network._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent_software._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent_software._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent_software._id},{$push:{tickets_low:ticket._id}})
      }else{
        
        //if there is no one avalible then put it any way in software agent
        const ticket = await ticketModel.create({user:req.user._id,agent:agent._id,issueType,subCategory,priority,mssg})
        // insert ticket to agent according to priority
        if(priority =="high")await agentModel.updateOne({_id:agent._id},{$push:{tickets_high:ticket._id}})
        if(priority =="medium")await agentModel.updateOne({_id:agent._id},{$push:{tickets_medium:ticket._id}})
        if(priority =="low")await agentModel.updateOne({_id:agent._id},{$push:{tickets_low:ticket._id}})
      }
      return res.json({mssg:"Your Request is sent"})

    }


  }catch(err){
    console.log(err)
    res.json({mssg:err})
  }
}

// Get automated solution
module.exports.automated = async (req,res)=>{
  const{subCategory} = req.body
  try{
    const sol = await automatedModel.findOne({subCategory})
    return res.json(sol.automatedWorkflow)
  }catch(err){
    console.log(err)
    return res.json({mssg:"Error while retriving solution"})
  }
}
  
