const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const {
  minLengthValue,
  maxLengthValue,
  urlRegExp,
} = require('../utils/constants');
const { userCredentialsError } = require('../utils/errors');
const UnauthorizedError = require('../errors/unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: minLengthValue,
    maxlength: maxLengthValue,
    default: 'Frank Castle',
  },
  about: {
    type: String,
    required: false,
    minlength: minLengthValue,
    maxlength: maxLengthValue,
    default: 'The truth must be taken',
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(url) {
        return urlRegExp(url);
      },
      message: 'Укажите корректный адрес url',
    },
    default: 'https://raw.githubusercontent.com/avtorsky/mesto/dev/sprint-8/src/images/profile/profile-avatar.jpg',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(string) {
        return isEmail(string);
      },
      message: 'Укажите корректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: minLengthValue,
    select: false,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(userCredentialsError));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(userCredentialsError));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
