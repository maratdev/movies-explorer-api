const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { CREATED } = require('../errors/statusCode');
const { JWT_TOKEN_EXPIRES } = require('../util/constants');
const { invalidDataError, duplicateEmailError } = require('../errors/error-texts');

const {
  NODE_ENV, JWT_SECRET,
} = process.env;

// Создаёт пользователя
const createUser = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 7);
  const {
    name, email, password,
  } = req.body;
  const newUser = new User({
    name, email, password,
  });
  newUser
    .save()
    .then((result) => {
      res.status(CREATED).send({
        email: result.email,
        name: result.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(invalidDataError));
      } else if (err.code === 11000) {
        next(new ConflictError(duplicateEmailError));
      } else {
        next(err);
      }
    });
};

// Авторизация
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id.toString() }, NODE_ENV === 'production' ? JWT_SECRET : 'prpZUoYKk3YJ3nhemFHZ', { expiresIn: JWT_TOKEN_EXPIRES });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
};
