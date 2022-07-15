'use strict';
/*
 *
 * Call Log Model.
 *
 */

// Dependencies.

const mongoose = require('mongoose');

const CallLogSchema = new mongoose.Schema({
    callerName: {
        type: String
    },
    contactName: {
        type: String,
    },
    contactPhone: {
        type: String,
    },
    callDate: {
        type: Date,
        default: Date.now,
    },
});

// Export the module.
module.exports = mongoose.model('Call', CallLogSchema);