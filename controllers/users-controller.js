const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { OK, handleResult } = require('../errors/statusCode');

// Получить данные пользователе
const getCurrentUser = (req, res, next) => {
  console.log(req.user)
  User.findById(req.body._id, { _id: 0 })  //! поменеять body на users
    .then((user) => handleResult(res, user))
    .catch(next);
};

// Обновление данных user
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(OK).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCurrentUser,
  updateUser
};
