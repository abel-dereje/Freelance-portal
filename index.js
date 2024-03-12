const express = require('express');
const dotenv = require('dotenv').config();
const db_connect = require('./config/db');
const cookieParser = require('cookie-parser');

// Middleware
const errorHandler = require('./middleware/errorHandling');
const tokenHandler = require("./middleware/tokenValidateHandler");

// Loading routes
const skillRoutes = require('./routes/skill.routes');
const userRoutes = require('./routes/user.routes');
const jobPostRoutes = require('./routes/postJob.routes');
const messageRoutes = require('./routes/message.routes');
const conversationRoutes = require('./routes/conversation.routes');
const profileRoutes = require('./routes/profile.routes');

// Connect to the database
db_connect();

// Create express application
const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(skillRoutes);
app.use(userRoutes);
app.use(jobPostRoutes);
app.use(conversationRoutes);
app.use(messageRoutes);
app.use(profileRoutes);

// Error handling middleware (Should come after routes, before tokenHandler)
app.use(errorHandler);

// Token validation middleware
app.use(tokenHandler);

// Define the port
const port = process.env.PORT || 4000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
