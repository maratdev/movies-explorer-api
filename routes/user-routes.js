const router = require('express').Router();

const {
  getCurrentUser,
} = require('../controllers/users-controller');

// Получить данные о всех пользователях
router.get('/users/me', getCurrentUser);

module.exports = router;
