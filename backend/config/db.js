const mongoose = require('mongoose');
const config = require('config');
 const db = config.get('mongoURI');


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