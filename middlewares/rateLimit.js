const rateLimit = require('express-rate-limit');
const { TIME_LIMIT, MAX_LIMIT } = require('../util/constants');

const limiter = rateLimit({
  windowMs: TIME_LIMIT,
  max: MAX_LIMIT,
});

module.exports = limiter;
