'use strict';
/*
 *
 * Authorization Controller.
 *
 */

// Dependencies.
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');


// @desc        : Get current logged in user.
// @Req. Data   : none. 
// @route       : POST /api/auth/me.
// @access:     : Private.
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = (await User.findById(req.user.id)) || null;

    return res.status(200).json({
        success: true,
        data: user,
    });
});

// @desc        : Sign up user.
// @Req. Data   : userName, password.
// @route       : POST /api/auth/signup.
// @access      : Public.
exports.signUp = asyncHandler(async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const user = await User.create({
            userName,
            password,
        });
        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        return res.status(409).json({
            success: false,
            data: err.message,
        });
    }
});

// @desc        : Sign in user.
// @Req. Data   : userName, password.
// @route       : POST /api/auth/signin.
// @access      : Public.
exports.signIn = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;

    // Validate userName & password.
    if (!userName || !password) {
        return next(new ErrorResponse('Please provide an userName and password', 400));
    }

    // Check for user.
    const user = await User.findOne({ userName }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches.
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response.
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    return res.status(statusCode).cookie('token', token, options, User.userName).json({
        success: true,
        token,
    });
};