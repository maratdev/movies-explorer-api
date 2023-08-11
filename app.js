require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');
const serverLog = require('./middlewares/serverlog');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CORS_OPTIONS } = require('./middlewares/cors');
const {
  MONGO_URL_DEV, CONNECTED_BD, CONNECTED_BD_ERR, SERVER_ON,
} = require('./util/constants');
const router = require('./routes');

const app = express();
// подключаем логгер запросов
app.use(requestLogger);
// CORS
app.use(cors(CORS_OPTIONS));
// динамическое ограничение скорости
app.use(helmet());
app.use(limiter);

// чтение тело запросов
app.use(express.json());

// Добавление данных / роутинги
app.use(router);

// Здесь обрабатываем все ошибки
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(serverLog);

// ----------------------------------- Настройки сервера и БД --------------------------------/
const { NODE_ENV, DB, PORT = 3000 } = process.env;

/* eslint-disable no-console */
mongoose.connect(NODE_ENV === 'production' ? DB : MONGO_URL_DEV, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(CONNECTED_BD))
  .catch((err) => console.error(CONNECTED_BD_ERR, err));

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(SERVER_ON, PORT);
});
