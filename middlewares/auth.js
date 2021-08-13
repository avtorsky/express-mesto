const jwt = require('jsonwebtoken');
const { userAuthError, endpointAuthError } = require('../utils/errors');
const UnauthorizedError = require('../errors/unauthorized');
const ForbiddenError = require('../errors/forbidden');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(userAuthError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ForbiddenError(endpointAuthError);
  }

  req.user = payload;

  next();
};
