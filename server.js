// importing package using require 
const express=require('express');

// apply your Database on the top level


// creating express application 
const app= express();

// MiddleWare JSON  File for Client to request


// Middleware As Application level of Routers 



// port number 
const port=4000;

// i have created the express application then the express app should be listening on port
app.listen(port,()=>{
    console.log(`Server listing or running on port ${port}`);
});
