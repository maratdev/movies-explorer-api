require('dotenv').config();

const DB = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_TOKEN_EXPIRES = '7d';
// limiter
const TIME_LIMIT = 15 * 60 * 1000; // за 15 минут
const MAX_LIMIT = 250; // можно совершить максимум 250 запросов с одного IP
// BD
const CONNECTED_BD = '✔ Connected to MongoDB ';
const CONNECTED_BD_ERR = '✖ DB connection error: ';
const SERVER_ON = 'Server listening on PORT ';
module.exports = {
  JWT_TOKEN_EXPIRES,
  TIME_LIMIT,
  MAX_LIMIT,
  DB,
  CONNECTED_BD,
  CONNECTED_BD_ERR,
  SERVER_ON,
};
