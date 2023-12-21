const express=require('express');

const router = require('./routes/user.routes');
const db_connect = require('./config/db')

// Calling database function
db_connect();

// creating express application 
const app = express();


// Middleware JSON file for client requests
app.use(express.json());
app.use(router);

// Error handlers Middleware



// port number 
const port=4000;

// i have created the express application then the express app should be listening on port
app.listen(port,()=>{
    console.log(`Server listing or running on port ${port}`);
});
