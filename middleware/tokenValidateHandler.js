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
        // // Check if the request is for createProfile route
        // if (req.path === '/createProfile') {
        //     // If it is, simply proceed to the next middleware or route handler
        //     return next();
        // }
        try {
            let token;
            let authHeader = req.headers.authorization || req.headers.Authorization;
    
            // Check for JWT token in Authorization header
            if (authHeader && authHeader.startsWith('Bearer')) {
                token = authHeader.split(" ")[1];
            } else if (req.cookies && req.cookies.accessToken) {
                token = req.cookies.accessToken;
            }
    
            if (!token) {
                return res.status(401).send({ error: "Token is required" });
            }
    
            // Verify JWT token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    
            // Attach user_id to request object
            req.user_id = decoded.thisUser.id; // Assuming user_id is stored in thisUser.id
    
            next();
        } catch (err) {
            res.status(401).send({ error: "User not authenticated or token is not valid" });
        }
});


module.exports = tokenHandler;
