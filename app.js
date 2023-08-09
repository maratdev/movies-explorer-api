require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/auth');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const { serverLog } = require('./middlewares/serverlog');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const app = express();
app.use(express.json());

// подключаем логгер запросов
app.use(requestLogger);

// Добавление данных / роутинги
app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);
app.use(router);

// Здесь обрабатываем все ошибки
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(serverLog);

// ----------------------------------- Настройки сервера и БД --------------------------------/

const { PORT = process.env.PORT || 3000, DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✔ Connected to MongoDB '))
  .catch((err) => console.log(`✖ DB connection error: ${err}`));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listen port ${PORT}`);
  }
});
