/* eslint-disable no-useless-escape */
const mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const minLength = 2;
const maxLength = 30;
const urlRegExp = (value) => {
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/gm.test(value);
};

module.exports = {
  minLength,
  maxLength,
  urlRegExp,
  mongooseConfig,
};
