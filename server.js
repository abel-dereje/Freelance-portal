const express = require('express');
const dotenv = require('dotenv').config();
const db_connect = require('./config/db');
const errorHandler = require('./middleware/errorHandling');
const tokenHandler = require("./middleware/tokenValidateHandler");
const userRoutes = require('./routes/user.routes');
const userManagementRoutes = require('./routes/userManagement.routes');

// Calling database function
db_connect();

// Creating express application
const app = express();
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(userManagementRoutes);

// Error handling middleware
app.use(errorHandler);
app.use(tokenHandler);

// Port number
const port = process.env.PORT || 4000;

// Server listening
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});