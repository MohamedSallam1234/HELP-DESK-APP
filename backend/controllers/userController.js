const userModule = require("../models/userModel")



module.exports.update = async (req,res)=>{
const {email,password,name} = req.body
try{
    if(!email || !password || !name)return res.json({mssg:"All fields should be filled"})

    const user = await userModule.findOne({email})
    
    if(user)return res.json({mssg:"Email is not avalible"})

    await userModule.updateOne({_id:req.user._id},{$set:{email:email,name:name,password:password}})
    return res.json({mssg:`${name}'s profile has been updated`})

}catch(err){
  console.log(err)
  res.json({mssg:"Error in update"})
}
}



  
