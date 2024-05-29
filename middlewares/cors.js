const { NODE_ENV, ALLOWED_CORS_PRODUCTION } = process.env;
const ALLOWED_CORS = NODE_ENV === 'production' ? ALLOWED_CORS_PRODUCTION.split(', ') : ['https://localhost:3000', 'https://explorer-movies.ru', 'http://explorer-movies.ru'];

const CORS_OPTIONS = {
  credentials: true,
  origin: ALLOWED_CORS,
  exposedHeaders: ['set-cookie'],
};

module.exports = {
  CORS_OPTIONS,
};
