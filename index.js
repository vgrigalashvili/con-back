'use strict';
/*
 *
 * Pimary file for the API.
 *
 */

// Dependencies.
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const app = express();
const dotenv = require('dotenv');

// dotenv config path.
dotenv.config({ path: './config/config.env' });

// DB Loader.
require('./config/db')();
// Utils Loader.
require('./loaders/util')(app);
// Routes Loader.
require('./loaders/routes')(app);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold
    );
});

// Handle unhandled promise rejections.
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    // Close server & exit process.
    server.close(() => process.exit(1));
});