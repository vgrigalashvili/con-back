'use strict';
/*
 *
 * Validation Middleware.
 *
 */

const val = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (!error) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            res.status(422).json({
                success: false,
                error: message
            });
        }
    }
}

// Export the module.
module.exports = val;