const Movie = require('../models/movie');
const { CREATED, handleResult } = require('../errors/statusCode');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  invalidDataError, movieIdNotFoundError, movieDeletedSuccess, forbiddenError,
} = require('../errors/error-texts');

// Получить данные о всех фильмах
const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie
    .find({ owner })
    .populate(['owner'])
    .then((movies) => handleResult(res, movies))
    .catch(next);
};

// Создаёт карточку
const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
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
    owner: req.user._id,
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
        next(new BadRequestError(invalidDataError));
        return;
      }
      next(err);
    });
};

// Удаление фильма
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  return Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieIdNotFoundError);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenError);
      }
      return Movie.findByIdAndRemove(movieId).then(() => {
        res.send({ message: movieDeletedSuccess });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(invalidDataError));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
