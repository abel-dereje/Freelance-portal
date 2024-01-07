const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const tokenHandler = asyncHandler(async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      res.status(401);
      throw new Error('Token is required');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User not authenticated or token is invalid');
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
