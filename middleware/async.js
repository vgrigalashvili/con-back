'use strict';
/*
 *
 * Async Handler.
 *
 */

// Dependencies.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Export the module.
module.exports = asyncHandler;