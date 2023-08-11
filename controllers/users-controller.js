const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { OK, handleResult } = require('../errors/statusCode');

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
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(OK).json(result);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Этот email занят'));
      }
      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
};
