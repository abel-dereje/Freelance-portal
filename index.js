const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const db_connect = require('./config/db');
const cookieParser = require('cookie-parser');

// Middleware
//const { errorHandler, tokenHandler } = require("./middleware/tokenValidateHandler");

// Connect to the database
db_connect();

// Create express application
const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Change this to the actual origin of your frontend application
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Token validation middleware
//app.use(tokenHandler);

// Loading routes
const skillRoutes = require('./routes/skill.routes');
const userRoutes = require('./routes/user.routes');
const jobPostRoutes = require('./routes/postJob.routes');
const messageRoutes = require('./routes/message.routes');
const conversationRoutes = require('./routes/conversation.routes');
const profileRoutes = require('./routes/profile.routes');

// Routes
app.use(skillRoutes);
app.use(userRoutes);
app.use(jobPostRoutes);
app.use(conversationRoutes);
app.use(messageRoutes);
app.use(profileRoutes);

// Error handling middleware (Should come after routes)
// app.use(errorHandler);

// Define the port
const port = process.env.PORT_NUMBER || 3000; // Default to port 3000 if PORT_NUMBER is not defined

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
