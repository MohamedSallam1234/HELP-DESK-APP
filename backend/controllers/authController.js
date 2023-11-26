const userModel = require("../models/userModel");
const sessionModel = require("../models/sessionModel");
const validator = require ("validator")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userValidate = require("../models/userValidate")
require('dotenv').config();

module.exports.register = async (req,res)=>{
    const {email,password,name} = req.body
    if(!email || !password || !name)return res.json({mssg:"Email and Password and Name are Required"})
    try{
    await userValidate.validateAsync(req.body)
    const userExist = await userModel.findOne({email})
    if(userExist) return res.json({mssg:'User already exists'});

    if(!validator.isEmail(email))return res.json({mssg:"Wrong Email Format"})

    
    

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.create({email,password:hashedPassword,name})

    return res.json({mssg:"User Registerd"})

    } catch(err){
        if(err.isjoi === true)return res.json({mssg:err})
        console.log(err)
        return res.json({mssg:err})
        
    }
}

// JWT => header()  payload(user data but not sensitve data)  signature(that token is valid)   header+payload hashed with secrete key => signature

module.exports.login = async (req,res)=>{
    const {email, password}= req.body;
    try{
        if(!email || !password)return res.json({mssg:"All fields must be filled"})
        const user=await userModel.findOne({email})
        if (!user) return res.status(403).send({ mssg: "Invalid email or password." });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(403).send({ mssg: "Invalid email or password." });
        const currentDateTime = new Date();
        const expiresAt = new Date(+currentDateTime + 180000000); 
        const token = jwt.sign({user:{_id : user._id,role:user.role}}, process.env.SECRET ,{expiresIn:40000})
        const new_session = await sessionModel.create({userId:user._id,token,expiresAt})
        return res
        .cookie("token", token, {
          expires: expiresAt,
          withCredentials: true,
          httpOnly: false,
          SameSite:'none'})
        .status(200)
        .json({ message: "login successfully", user });

    }catch(err){
        console.log(err)
        res.json({mssg:err})

    }





}   
