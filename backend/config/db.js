const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.MONGODB_URI;

 // Connect to MongoDB
const connectDB = async ()=>{
    try{
        await mongoose.connect(db);
    }catch(err){
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;