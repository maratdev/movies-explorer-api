const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { OK, handleResult } = require('../errors/statusCode');
const { userIdNotFound, duplicateEmailError, invalidDataError } = require('../errors/error-texts');

// Получить данные пользователе
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id, { _id: 0, __v: 0 })
    .then((user) => handleResult(res, user))
    .catch(next);
};

// Обновление данных user
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, email }, { _id: 0, new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError(userIdNotFound);
      }
      res.status(OK).json(result);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(invalidDataError));
      }
      if (err.code === 11000) {
        return next(new ConflictError(duplicateEmailError));
      }
      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
};
