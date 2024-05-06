const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
import setAuthToken from './setAuthToken';


const tokenHandler = asyncHandler(async (req, res, next) => {
    try {
        // Check if the request is for signup, login, or profiles routes
        if (['/signup', '/login' ].includes(req.path.toLowerCase())) {
            return next(); // Proceed to the next middleware or route handler
        }

        let token;
        const authHeader = req.headers.authorization || req.headers.Authorization;

        // Check for JWT token in Authorization header
        if (authHeader && authHeader.toLowerCase().startsWith('bearer')) {
            token = authHeader.split(" ")[1];
        } else if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        } else if (req.headers && req.headers.token) { // Add this block to check for token in headers
            token = req.headers.token;
        } else {
            // Retrieve token from localStorage (for client-side applications)
            token = localStorage.getItem("accessToken");
        }

        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

        // Attach user_id to request object
        req.user_id = decoded.thisUser.id; // Assuming user_id is stored in thisUser.id

        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).json({ error: "Token expired. Please log in again." });
        } else {
            console.error("Authentication Error:", err);
            res.status(401).json({ error: "User not authenticated or token is not valid" });
        }
    }
});

const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || res.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
};

module.exports = { tokenHandler, errorHandler };
