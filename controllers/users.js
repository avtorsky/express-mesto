const User = require('../models/user');
const {
  defaultError,
  userValidationError,
  userCastError,
  codeBadRequest,
  codeNotFound,
  codeServerError,
} = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => {
      res.status(codeServerError).send({ message: defaultError });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(codeNotFound).send({ message: userCastError });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(codeBadRequest).send({ message: userCastError });
      }
      return res.status(codeServerError).send({ message: defaultError });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(codeBadRequest).send({ message: userValidationError });
      }
      return res.status(codeServerError).send({ message: defaultError });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, upsert: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(codeNotFound).send({ message: userCastError });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(codeBadRequest).send({ message: userValidationError });
      } if (err.name === 'CastError') {
        return res.status(codeBadRequest).send({ message: userCastError });
      }
      return res.status(codeServerError).send({ message: defaultError });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, upsert: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(codeNotFound).send({ message: userCastError });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(codeBadRequest).send({ message: userValidationError });
      } if (err.name === 'CastError') {
        return res.status(codeBadRequest).send({ message: userCastError });
      }
      return res.status(codeServerError).send({ message: defaultError });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
