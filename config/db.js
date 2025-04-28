const mongoose = require("mongoose");
require('dotenv').config();


const connectDB = async () => {
    try{
        await mongoose.connect(
            process.env.MONGO_URL,
        );

        console.log("MongoDB Connected");
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        
    }
}


module.exports = connectDB;