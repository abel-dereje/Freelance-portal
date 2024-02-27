// creating express 
const express = require('express');

// create dotenv config
const dotenv = require('dotenv').config(); 

// loading or require the routes folder 
const skillRoutes = require('./routes/skill.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const messageRoutes = require('./routes/message.routes');
const conversationRoutes = require('./routes/conversation.routes');

// loading or require the middleware custom 
const errorHandler = require('./middleware/errorHandling');
const db_connect = require('./config/db');

// calling the database connection
db_connect();

// creating the express app
const app = express();

// applying a middleware to access the JSON from the client 
app.use(express.json());

// middleware routes
app.use(skillRoutes);
app.use(userRoutes);
app.use(orderRoutes);
app.use(conversationRoutes);
app.use(messageRoutes);

// we have to use the errorHandler 
//  app.use(errorHandler);

// creating the express app with the port number to listen on
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
