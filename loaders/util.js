'use strict';
/*
 *
 * Primary file for the API Utility Middlewares.
 *
 */

// Dependencies.
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('../middleware/error');

module.exports = function (app) {
    // Body parser.
    app.use(express.json());
    // Error Handler.
    app.use(errorHandler);
    // Cookie parser.
    app.use(cookieParser());
    // Enable CORS.
    app.use(cors());
};