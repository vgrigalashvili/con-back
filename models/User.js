'use strict';
/*
 *
 * User Model.
 *
 */

// Dependencies.
// const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please enter userName'],
        unique: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 4,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }

});

// Encrypt passwrod using bcrypt.
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return.
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, userName: this.userName }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in database.
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the module.
module.exports = mongoose.model('User', UserSchema);