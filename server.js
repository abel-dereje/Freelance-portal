// importing package using require 
const express=require('express');
const db_connect = require('./db/db-config');
require('dotenv').config();


// apply your Database on the top level methods 
db_connect();

// creating express application 
const app= express();

// MiddleWare JSON  File for Client to request
app.use(express.json());

// Middleware As Application level of Routers / error handlers



// port number 
const port=process.env.PORT_NUMBER || 4001;

// i have created the express application then the express app should be listening on port
app.listen(port,()=>{
    console.log(`Server listing or running on port ${port}`);
});
