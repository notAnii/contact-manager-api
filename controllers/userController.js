const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//@desc Register a user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        throw new CustomError('Please provide all fields', 400);
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        throw new CustomError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if(user){
        res.status(200).json({ _id: user._id, email: user.email });
    } else {
        throw new CustomError('Invalid user data', 400);
    }

});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new CustomError('Please provide all fields', 400);
    }

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        );
        res.status(200).json({ accessToken });
    } else {
        throw new CustomError('Email or Password Invalid', 401);
    }
    
});

//@desc Get current logged in user
//@route GET /api/users/current
//@access Private

const CurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { 
    registerUser,
    loginUser,
    CurrentUser
};