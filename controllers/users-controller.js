const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { OK, handleResult } = require('../errors/statusCode');

// Получить данные пользователе
// Получить данные о пользователе
const getCurrentUser = (req, res, next) => {
  User.findById(req.body._id) //! поменеять на users
    .then((user) => handleResult(res, user))
    .catch(next);
};

module.exports = {
  getCurrentUser,
};

