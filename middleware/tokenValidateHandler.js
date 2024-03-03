const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const tokenHandler = asyncHandler(async (req, res, next) => {
    // Check if the request is for signup route
    if (req.path === '/signup') {
        // If it is, simply proceed to the next middleware or route handler
        return next();
    }
    // Check if the request is for login route
    if (req.path === '/login') {
        // If it is, simply proceed to the next middleware or route handler
        return next();
    }

    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).send({ error: "Token is required" });
    }
    
    token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        console.log(decoded);
        req.thisUser = decoded.thisUser;

        // Check if the user has the required role for accessing the route
        // Assuming each route requires a specific role, modify this logic based on your actual requirements
        if (req.path === '/login' && !['admin', 'freelancer', 'employer'].includes(req.thisUser.role)) {
            return res.status(403).send({ error: "Unauthorized. Insufficient role." });
        }

        // If the user has the required role, proceed to the next middleware or route handler
        next();
    } catch (err) {
        res.status(401).send({ error: "User not authenticated or token is not valid" });
    }
});

module.exports = tokenHandler;
