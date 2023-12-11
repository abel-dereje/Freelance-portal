const express=require('express');

// creating express application 
const app= express();

app.get('/', (req, res) => {
    res.status(200).json({message:"This first server is created by express"})
})

app.post('/', (req, res) => {
    app.status(200).json({message:"This first server is created by express"})
})

// port number 
const port=4000;

// i have created the express application then the express app should be listening on port
app.listen(port,()=>{
    console.log(`Server listing or running on port ${port}`);
});
