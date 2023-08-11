require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');
const { serverLog } = require('./middlewares/serverlog');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CORS_OPTIONS } = require('./middlewares/cors');
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
