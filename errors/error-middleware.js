const { codeServerError, internalServerError } = require('../utils/errors');

// eslint-disable-next-line no-unused-vars
const serverErrorMiddleware = (err, req, res, next) => {
  const { statusCode = codeServerError, message } = err;
  const errorMessage = (statusCode === codeServerError) ? internalServerError : message;

  res.status(statusCode).send({ message: errorMessage });
};

module.exports = serverErrorMiddleware;
