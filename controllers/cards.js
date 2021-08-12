const Card = require('../models/card');
const { cardValidationError, cardAuthError, cardCastError } = require('../utils/errors');
const { codeStatusOk, codeStatusCreated } = require('../utils/constants');
const BadRequestError = require('../errors/bad-request');
const ForbiddenError = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(codeStatusOk).send({ cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(codeStatusCreated).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(cardValidationError);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardCastError);
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError(cardAuthError);
      }
      return res.status(codeStatusOk).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(cardCastError);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardCastError);
      }
      return res.status(codeStatusOk).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(cardValidationError);
      } if (err.name === 'CastError') {
        throw new BadRequestError(cardCastError);
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardCastError);
      }
      return res.status(codeStatusOk).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(cardValidationError);
      } if (err.name === 'CastError') {
        throw new BadRequestError(cardCastError);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
