'use strict';

module.exports = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    next('should have a name and price (body)');
  } else {
    next();
  }
};