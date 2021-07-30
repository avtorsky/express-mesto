const mongoose = require('mongoose');
const {
  minLength,
  maxLength,
  urlRegExp,
} = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: minLength,
    maxlength: maxLength,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return urlRegExp(url);
      },
      message: 'Укажите корректный адрес url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
