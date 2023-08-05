const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const { CREATED, handleResult } = require('../errors/statusCode');
// Получить данные о всех фильмах
const getMovies = (req, res, next) => {
  Movie
    .find()
    .then((cards) => handleResult(res, cards))
    .catch(next);
};

// Создаёт карточку
const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN,
  } = req.body;
  const newMovie = new Movie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  });
  newMovie
    .save()
    .then((result) => {
      res.status(CREATED).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
};
