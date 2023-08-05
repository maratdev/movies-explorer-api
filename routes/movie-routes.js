const router = require('express').Router();
const { validationCreateMovie } = require('../middlewares/validation');

const { getMovies, createMovie } = require('../controllers/movies-conroller');

// Получить данные о всех карточках
router.get('/', getMovies);
// Добавление данных
router.post('/', validationCreateMovie, createMovie);

module.exports = router;
