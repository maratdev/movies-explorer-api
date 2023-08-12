const { SERVER_ERROR } = require('../errors/statusCode');
const { serverError } = require('../errors/error-texts');

const serverLog = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === SERVER_ERROR
        ? serverError
        : message,
    });
  next();
};

module.exports = serverLog;
