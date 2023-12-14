const express=require('express');
const { route } = require('./routes/user.routes');

// creating express application 
const app= express();
const router= express.Router();

// port number 
const port=4000;

// i have created the express application then the express app should be listening on port
app.listen(port,()=>{
    console.log(`Server listing or running on port ${port}`);
});
