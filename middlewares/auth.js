const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { unauthorizedError } = require('../errors/error-texts');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization?.startsWith('Bearer ')) {
    return next(new UnauthorizedError(unauthorizedError));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'prpZUoYKk3YJ3nhemFHZ');
  } catch (err) {
    return next(new UnauthorizedError(unauthorizedError));
  }
  req.user = payload;
  return next();
};
