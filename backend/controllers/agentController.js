// const agentModel = require("../../../../Downloads/HELP-DESK-APP-Minaehab (1)/HELP-DESK-APP-Minaehab/backend/models/agentModel")
// const ticketModel = require("../../../../Downloads/HELP-DESK-APP-Minaehab (1)/HELP-DESK-APP-Minaehab/backend/models/ticketModel")
// const automatedModel = require("../../../../Downloads/HELP-DESK-APP-Minaehab (1)/HELP-DESK-APP-Minaehab/backend/models/automatedworkflowModel")
// const ticketmanagerModel = require("../../../../Downloads/HELP-DESK-APP-Minaehab (1)/HELP-DESK-APP-Minaehab/backend/models/ticketmanagerModel")
// const userModel = require("../../../../Downloads/HELP-DESK-APP-Minaehab (1)/HELP-DESK-APP-Minaehab/backend/models/userModel")

const agentModel = require("../models/agentModel");
const ticketModel = require("../models/ticketModel");
const automatedModel = require("../models/automatedworkflowModel");
const ticketmanagerModel = require("../models/ticketmanagerModel");
const userModel = require("../models/userModel");
const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { model } = require("mongoose");



// create an automated solution
module.exports.createsol = async (req,res)=>{
    const {subCategory,automatedWorkflow} = req.body
    try{
        if(!subCategory || !automatedWorkflow)return res.json({mssg:"All fields need to be filled"})
        const check = await automatedModel.findOne({subCategory})
        if(check)return res.json({mssg:"An automated solution already exists"})
        const agent = await agentModel.findOne({user:req.user._id})
        await automatedModel.create({agent:agent._id,subCategory,automatedWorkflow})
    return res.json({mssg:"Solution uploaded"})
    }catch(err){
        console.log(err);
        return res.json({mssg:"error while uploading solution"})
    }
}

module.exports.updatetickets = async (req,res)=>{
    const{ticketid} = req.params
    const{resolution} = req.body
    if(!resolution)return res.json({mssg:"Enter the answer to question"})
    try{
     // create the ticket
     const closedAt = new Date()
     await ticketModel.updateOne({_id:ticketid},{resolution,status:"closed",closedAt})

     await agentModel.updateOne({user:req.user._id},{$pull:{tickets_queue:ticketid},$inc:{availability:-1}})


    //Get the tickets in ticket_Manger
    const ticket_Manager = await ticketmanagerModel.findOne({Manager_number:1})

    //loop on high priority tickets and assign it to agent if he is available
    for(let i=0; i <ticket_Manager.high_priority.length;i++){

      const ticket_details = await ticketModel.findOne({_id:ticket_Manager.high_priority[i]})

      if(ticket_details.issueType === "software"){
        const softwareAgent = await agentModel.findOne({major:'software'})
        if(softwareAgent.availability < 5){
          await agentModel.updateOne({_id:softwareAgent._id},{$push:{tickets_queue:ticket_Manager.high_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:softwareAgent._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{high_priority:ticket_Manager.high_priority[i]}})
        }
      }
      if(ticket_details.issueType === "hardware"){
        const hardwareAgent = await agentModel.findOne({major:'hardware'})
        if(hardwareAgent.availability < 5){
          await agentModel.updateOne({_id:hardwareAgent._id},{$push:{tickets_queue:ticket_Manager.high_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:hardwareAgent._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{high_priority:ticket_Manager.high_priority[i]}})
        }
      }
      if(ticket_details.issueType === "network"){
        const networkAgent = await agentModel.findOne({major:'network'})
        if(networkAgent.availability < 5){
          await agentModel.updateOne({_id:networkAgent._id},{$push:{tickets_queue:ticket_Manager.high_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:networkAgent._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{high_priority:ticket_Manager.high_priority[i]}})
        }
      }
    }

    //loop on medium priority tickets and assign it to agent if he is available
    for(let i=0; i <ticket_Manager.medium_priority.length;i++){

      const ticket_details = await ticketModel.findOne({_id:ticket_Manager.medium_priority[i]})

      if(ticket_details.issueType === "software"){
        const softwareAgent = await agentModel.findOne({major:'software'})
        const softwarehelper = await agentModel.findOne({major:'hardware'})
        if(softwareAgent.availability < 5){
          await agentModel.updateOne({_id:softwareAgent._id},{$push:{tickets_queue:ticket_Manager.medium_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:softwareAgent._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{medium_priority:ticket_Manager.medium_priority[i]}})
        }
        else if(softwarehelper.availability<5){
          await agentModel.updateOne({_id:softwarehelper._id},{$push:{tickets_queue:ticket_Manager.medium_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:softwarehelper._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{medium_priority:ticket_Manager.medium_priority[i]}})
        }
      }
      if(ticket_details.issueType === "hardware"){
        const hardwareAgent = await agentModel.findOne({major:'hardware'})
        const hardwarehelper = await agentModel.findOne({major:'network'})
        if(hardwareAgent.availability < 5){
          await agentModel.updateOne({_id:hardwareAgent._id},{$push:{tickets_queue:ticket_Manager.medium_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:hardwareAgent._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{medium_priority:ticket_Manager.medium_priority[i]}})
        }
        else if(hardwarehelper.availability < 5){
          await agentModel.updateOne({_id:hardwarehelper._id},{$push:{tickets_queue:ticket_Manager.medium_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:hardwarehelper._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{medium_priority:ticket_Manager.medium_priority[i]}})
        }
      }
      if(ticket_details.issueType === "network"){
        const networkAgent = await agentModel.findOne({major:'network'})
        const networkhelper = await agentModel.findOne({major:'software'})
        if(networkAgent.availability < 5){
          await agentModel.updateOne({_id:networkAgent._id},{$push:{tickets_queue:ticket_Manager.medium_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:networkAgent._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{medium_priority:ticket_Manager.medium_priority[i]}})
        }
        else if(networkhelper.availability < 5){
          await agentModel.updateOne({_id:networkhelper._id},{$push:{tickets_queue:ticket_Manager.medium_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:networkhelper._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{medium_priority:ticket_Manager.medium_priority[i]}})
        }
      }
    }

    // low priority

    for(let i=0; i <ticket_Manager.low_priority.length;i++){

      const ticket_details = await ticketModel.findOne({_id:ticket_Manager.low_priority[i]})

      if(ticket_details.issueType === "software"){
        const softwareAgent = await agentModel.findOne({major:'software'})
        const shelper = await agentModel.findOne({major:'network'})
        if(softwareAgent.availability < 5){
          await agentModel.updateOne({_id:softwareAgent._id},{$push:{tickets_queue:ticket_Manager.low_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:softwareAgent._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{low_priority:ticket_Manager.low_priority[i]}})
        }
        else if(shelper.availability<5){
          await agentModel.updateOne({_id:shelper._id},{$push:{tickets_queue:ticket_Manager.low_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:shelper._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{low_priority:ticket_Manager.low_priority[i]}})
        }
      }
      if(ticket_details.issueType === "hardware"){
        const hardwareAgent = await agentModel.findOne({major:'hardware'})
        const hhelper = await agentModel.findOne({major:'software'})
        if(hardwareAgent.availability < 5){
          await agentModel.updateOne({_id:hardwareAgent._id},{$push:{tickets_queue:ticket_Manager.low_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:hardwareAgent._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{low_priority:ticket_Manager.low_priority[i]}})
        }
       else if(hhelper.availability < 5){
          await agentModel.updateOne({_id:hhelper._id},{$push:{tickets_queue:ticket_Manager.low_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:hhelper._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{low_priority:ticket_Manager.low_priority[i]}})
        }
      }
      if(ticket_details.issueType === "network"){
        const networkAgent = await agentModel.findOne({major:'network'})
        const nhelper = await agentModel.findOne({major:'hardware'})
        if(networkAgent.availability < 5){
          await agentModel.updateOne({_id:networkAgent._id},{$push:{tickets_queue:ticket_Manager.low_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:networkAgent._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{low_priority:ticket_Manager.low_priority[i]}})
        }
        else if(nhelper.availability < 5){
          await agentModel.updateOne({_id:nhelper._id},{$push:{tickets_queue:ticket_Manager.low_priority[i]},$inc:{availability:1}})
          await ticketModel.updateOne({_id:ticket_details._id},{agent:nhelper._id,status:"pending"})
          await ticketmanagerModel.updateOne({Manager_number:1},{$pull:{low_priority:ticket_Manager.low_priority[i]}})
        }
      }
    }
    return res.json({mssg:"Ticket is closed"})

    }catch(err){
      console.log(err)
      return res.json({mssg:err})
    }
}



// get tickets of a user
module.exports.showTickets = async (req,res)=>{

 try{

const agent = await agentModel.findOne({user:req.user._id})
if(!agent) {return res.json({mssg:"No Agent"})}
if(agent.tickets_queue.length === 0)
{
  return res.json({mssg:"No tickets Yet"})
}else{
  let tickets =[]
  for(let i=0 ;i <agent.tickets_queue.length;i++){
    let ticketinfo = await ticketModel
    .findOne({ _id: agent.tickets_queue[i] })
    .populate("user")
    .exec();
    tickets.push(ticketinfo)
  }
  console.log(tickets)
  return res.json(tickets)
}
}catch(err){
console.log(err)
return res.json({mssg:err})
}
}

module.exports.sendEmail = async (req, res) => {
    let transporter = nodeMailer.createTransport(
        smtpTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: "helpdeskapp21@gmail.com",
                pass: "eozkineivvcjdhgv",
            },
        })
    );

    let mailOptions = {
        from: "helpdeskapp21@gmail.com",
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
    };

    await transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
            res.json({ status: false, msg: "Failed to send email" });
        } else {
            res.json({ status: true, msg: "Email sent successfully" });
        }
    });
};


module.exports.agentticket = async (req,res)=>{
    const { ticketid } = req.params;

    try{
        const ticketinfo = await ticketModel.findOne({_id:ticketid}).populate("user").exec();
        return res.json(ticketinfo)
    }catch(err){
        console.log(err)
        return res.status(422).json({message:'Error in fetching data'});

    }
}
