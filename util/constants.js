require('dotenv').config();

const COOKIE_MAX_AGE = 3600000 * 24 * 7; // 7d
const JWT_TOKEN_EXPIRES = '7d';
// limiter
const TIME_LIMIT = 15 * 60 * 1000; // за 15 минут
const MAX_LIMIT = 400; // можно совершить максимум 100 запросов с одного IP

module.exports = {
  JWT_TOKEN_EXPIRES,
  COOKIE_MAX_AGE,
  TIME_LIMIT,
  MAX_LIMIT,
};
