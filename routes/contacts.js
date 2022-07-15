'use strict';
/*
 *
 * Routes for Users.
 *
 */

// Dependencies.
const express = require('express');
const {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    callContact,
} = require('../controllers/contacts');
const advancedResults = require('../middleware/advancedResults');
const val = require('../middleware/val');
const schemas = require('../utils/schemasJoi');
const Contact = require('../models/Contact');
const router = express.Router();
const { protect } = require('../middleware/auth');


router.get('/getcontacts', protect, advancedResults(Contact), getContacts);
router.post('/createcontact', protect, val(schemas.contactVal), createContact);
router.put('/updatecontact/:id', protect, val(schemas.contactVal), updateContact);
router.delete('/deletecontact/:id', protect, deleteContact);
router.post('/callcontact', protect, callContact);

// Export the module.
module.exports = router;