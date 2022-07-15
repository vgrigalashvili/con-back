'use strict';
/*
 *
 * Primary file for the API Routes.
 *
 */

// Dependencies.
const auth = require('../routes/auth');
const contacts = require('../routes/contacts');

module.exports = function (app) {
    // Mount routers.
    app.use('/api/auth', auth);
    app.use('/api/contacts', contacts);
};