const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRoutes = require('./user-routes');
const moviesRoutes = require('./movie-routes');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);
router.use('/*', auth, (req, res, next) => next(new NotFoundError('Такая страница не существует')));

module.exports = router;
