const agentModule = require("../models/agentModel")
const userModel = require("../models/userModel")
const auth = require("./authController")
const bcrypt = require("bcrypt");
const validator = require ("validator")
const KonwledgeModle = require("../models/knowledgeModel");
const knowledgeModel = require("../models/knowledgeModel");


module.exports.createusers = async(req,res)=>{
          
      const {email,password,name,role} = req.body
      if(!email || !password || !name || !role)return res.json({mssg:"All fields are required"})
      try{
      const userExist = await userModel.findOne({email})
      if(userExist) return res.json({mssg:'User already exists'});
  
      if(!validator.isEmail(email))return res.json({mssg:"Wrong Email Format"})
  
      
      
  
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt);
      if(role ==4){
        const user = await userModel.create({email,password:hashedPassword,name,role})
        await agentModule.create({user:user._id}) 
        return res.json({mssg:"User Created"})
      }
      await userModel.create({email,password:hashedPassword,name,role})
  
      return res.json({mssg:"User Created"})
  
      } catch(err){
          console.log(err)
          return res.json({mssg:err})
          
      }
}

module.exports.addFAQs = async (req,res)=>{
  const{question,answer,category} = req.body
  if (!question||!answer||!category) return res.status(500).send('Please fill all the fields')
  // add data to knowledgebase
  await knowledgeModel.create({question,answer,category}) 
  return res.json({mssg:"Added Successfully"})
}





