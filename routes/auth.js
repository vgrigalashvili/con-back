'use strict';
/*
 *
 * Routes for authorization.
 *
 */

// Dependencies.
const express = require('express');
const {
    signUp,
    signIn,
    getMe,
} = require('../controllers/auth');

const val = require('../middleware/val');
const schemas = require('../utils/schemasJoi');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/signup', val(schemas.userVal), signUp);
router.post('/signin', val(schemas.userVal), signIn);
router.get('/me', protect, getMe);

// Export the module.
module.exports = router;