/* eslint-disable no-useless-escape */
const mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const minLengthValue = 2;
const maxLengthValue = 30;
const maxAgeValue = 3600000 * 24 * 7;
const urlRegExp = (value) => {
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/gm.test(value);
};

const codeStatusOk = 200;
const codeStatusCreated = 201;

module.exports = {
  minLengthValue,
  maxLengthValue,
  maxAgeValue,
  urlRegExp,
  mongooseConfig,
  codeStatusOk,
  codeStatusCreated,
};
