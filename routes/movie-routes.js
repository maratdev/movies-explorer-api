const router = require('express').Router();
const { validationCreateMovie, validationMovieById } = require('../middlewares/validation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies-conroller');

// Получить данные о всех карточках
router.get('/', getMovies);
// Добавление данных
router.post('/', validationCreateMovie, createMovie);
// Удаление данных
router.delete('/:movieId', validationMovieById, deleteMovie);

module.exports = router;
