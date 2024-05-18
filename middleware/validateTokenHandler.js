const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                throw new CustomError("User is not authorized", 401);
            }
            req.user = decoded.user;
            next();
        });
        
        if(!token){
            throw new CustomError("User is not authorized or token is missing", 401);
        }
    }
});

module.exports = validateToken;