const express=require('express');
const { route } = require('./routes/user.routes');
require('./config/db')

// creating express application 
const app= express();
const router= express.Router();

const bodyParser = require('express').json;
app.use(bodyParser);

// port number 
const port=4000;

// Route to Login Page
app.get('/login', (req, res) => {
    res.send("this is a login page")
});

// Route to Login Page
app.get('/login', (req, res) => {
    res.send("this is a signup page")
});

// i have created the express application then the express app should be listening on port
app.listen(port,()=>{
    console.log(`Server listing or running on port ${port}`);
});
