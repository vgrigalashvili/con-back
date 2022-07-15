'use strict';
/*
 *
 * Error Response.
 *
 */

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Export the module.
module.exports = ErrorResponse;