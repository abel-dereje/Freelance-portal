const express = require('express');
const dotenv = require('dotenv').config();
const db_connect = require('./config/db');

const errorHandler = require('./middleware/errorHandling');
const tokenHandler = require("./middleware/tokenValidateHandler");

const userRoutes = require('./routes/user.routes');
const userManagementRoutes = require('./routes/userManagement.routes');
const skillRoutes = require('./routes/skill.routes');
const messageRoutes = require('./routes/message.routes');
const ordersRoutes = require('./routes/order.routes')
const conversationRoutes = require('./routes/conversation.routes')

// Calling database function
db_connect();

// Creating express application
const app = express();
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(userManagementRoutes);
app.use(skillRoutes);
app.use(messageRoutes);
app.use(ordersRoutes);
app.use(conversationRoutes);

// Error handling middleware (Should come after routes, before tokenHandler)
app.use(errorHandler);

// Token validation middleware
app.use(tokenHandler);

// Port number
const port = process.env.PORT || 4000;

// Server listening
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
