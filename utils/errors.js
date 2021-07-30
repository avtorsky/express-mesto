const defaultError = 'Ошибка обработки запроса на сервере.';
const endpointCastError = 'Указанный URI ресурса не найден в базе.';
const cardValidationError = 'В запросе переданы некорректные данные карточки.';
const cardCastError = 'Указанный ID карточки не найден в базе.';
const userValidationError = 'В запросе переданы некорректные данные пользователя.';
const userCastError = 'Указанный ID пользователя не найден в базе.';
const codeBadRequest = 400;
const codeNotFound = 404;
const codeServerError = 500;

module.exports = {
  defaultError,
  endpointCastError,
  cardValidationError,
  cardCastError,
  userValidationError,
  userCastError,
  codeBadRequest,
  codeNotFound,
  codeServerError,
};
