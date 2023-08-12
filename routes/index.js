const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRoutes = require('./user-routes');
const moviesRoutes = require('./movie-routes');
const NotFoundError = require('../errors/NotFoundError');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/auth');
const { pageNotFound } = require('../errors/error-texts');

// регистрация и аторизация
router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);
router.use('/*', auth, (req, res, next) => next(new NotFoundError(pageNotFound)));

module.exports = router;
