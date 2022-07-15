'use strict';
/*
 *
 * Contact Model.
 *
 */

// Dependencies.

const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: [true, 'Please enter a contactName'],
        unique: true,
        minlength: 3,
    },
    contactPhone: {
        type: String,
        required: [true, 'Please enter a contactPhone'],
        unique: true,
        maxlength: 9,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

// Export the module.
module.exports = mongoose.model('Contact', ContactSchema);