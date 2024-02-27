const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const tokenHandler = asyncHandler(async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).send({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: 'User not authenticated or token is invalid' });
      }
      console.log(decoded);
      req.thisUser = decoded.thisUser;
      next();
    });
  } catch (error) {
    next(error);
  }
});

module.exports = tokenHandler;
