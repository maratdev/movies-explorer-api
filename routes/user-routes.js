const router = require('express').Router();
const { validationUpdateUser } = require('../middlewares/validation');
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users-controller');

// Получить данные о пользователе
router.get('/me', getCurrentUser);
router.patch('/me',validationUpdateUser, updateUser);


module.exports = router;
