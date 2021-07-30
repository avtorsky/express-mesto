const mongoose = require('mongoose');
const {
  minLength,
  maxLength,
  urlRegExp,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: minLength,
    maxlength: maxLength,
  },
  about: {
    type: String,
    required: true,
    minlength: minLength,
    maxlength: maxLength,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return urlRegExp(url);
      },
      message: 'Укажите корректный адрес url',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
