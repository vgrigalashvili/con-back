'use strict';
/*
 *
 * Primary file for the API DB Config.
 *
 */

// Dependencies.
const mongoose = require('mongoose');

module.exports = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};