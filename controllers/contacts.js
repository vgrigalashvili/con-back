'use strict';
/*
 *
 * Contacts Controller.
 *
 */

// Dependencies.
const ErrorResponse = require('../utils/errorResponse').default;
const asyncHandler = require('../middleware/async');
const Contact = require('../models/Contact');
const Call = require('../models/CallLog');
const jwt = require('jsonwebtoken');

// @desc        : Get all contacts.
// @Req. Data   : none.
// @route       : GET /api/contacts/getContacts.
// @access      : Private.
exports.getContacts = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc        : Create Contact.
// @Req. Data   : contactName, contactPhone.
// @route       : POST /api/contacts/createcontact.
// @access      : Private.
exports.createContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.create(req.body);

    return res.status(201).json({
        success: true,
        data: contact,
    });
});

// @desc        : Update Contact.
// @Req. Data   : contactName || contactPhone.
// @route       : PUT /api/contacts/updatecontact/:id.
// @access      : Private.
exports.updateContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    contact.save;
    return res.status(200).json({
        success: true,
        data: contact,
    });
});

// @desc        : Call Contact.
// @Req. Data   : contactName && contactPhone.
// @route       : PUT /api/contacts/callContact
// @access      : Private.
exports.callContact = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const callerName = decoded.userName;
    const { contactName, contactPhone } = req.body;
    const call = await Call.create({ callerName, contactName, contactPhone });

    return res.status(200).json({
        success: true,
        data: call,
    });
});

// @desc        : Delete Contact.
// @Req. Data   : Contact ID.
// @route       : DELETE /api/contacts/deletecontact/:id.
// @access      : Private.
exports.deleteContact = asyncHandler(async (req, res, next) => {
    await Contact.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        success: true,
        data: {},
    });
});