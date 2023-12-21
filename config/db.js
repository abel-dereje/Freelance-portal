// loading mongoose 
const mongoose = require('mongoose');
const dotenv=require("dotenv").config();


// create a Anonymous Function 
const db_connect= async ()=>{
     // try catch all exceptions
     try{
        const connections = await mongoose.connect(process.env.MONGODB_URI);
        // console host database
        console.log("The Database is Connected",connections.connection.host,connections.connection.port,connections.connection.name);

     }catch(error){
        console.log(error);
        process.exit(1);

     }


};


module.exports = db_connect;