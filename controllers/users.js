const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  userValidationError,
  userCastError,
  userAuthError,
  userCredentialsError,
} = require('../utils/errors');
const { maxAgeValue, codeStatusOk, codeStatusCreated } = require('../utils/constants');
const BadRequestError = require('../errors/bad-request');
const UnauthorizedError = require('../errors/unauthorized');
const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(codeStatusOk).send({ users }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userCastError);
      }
      return res.status(codeStatusOk).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userCastError);
      }
      next();
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestError(userValidationError);
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError(userCredentialsError));
      } return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(codeStatusCreated).send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(userValidationError);
      }
      next();
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userCastError);
      }
      return res.status(codeStatusOk).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(userValidationError);
      } if (err.name === 'CastError') {
        throw new BadRequestError(userCastError);
      }
      next();
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userCastError);
      }
      return res.status(codeStatusOk).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(userValidationError);
      } if (err.name === 'CastError') {
        throw new BadRequestError(userCastError);
      }
      next();
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { JWT_SECRET = 'dev-secret' } = process.env;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .status(codeStatusOk)
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: maxAgeValue,
        })
        .send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError(userAuthError));
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
