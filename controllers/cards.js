const Card = require('../models/card');
const {
  defaultError,
  cardValidationError,
  cardCastError,
  codeBadRequest,
  codeNotFound,
  codeServerError,
} = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ cards }))
    .catch(() => {
      res.status(codeServerError).send({ message: defaultError });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(codeBadRequest).send({ message: cardValidationError });
      }
      return res.status(codeServerError).send({ message: defaultError });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(codeNotFound).send({ message: cardCastError });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(codeBadRequest).send({ message: cardCastError });
      }
      return res.status(codeServerError).send({ message: defaultError });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        return res.status(codeNotFound).send({ message: cardCastError });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(codeBadRequest).send({ message: cardValidationError });
      }
      return res.status(codeServerError).send({ message: defaultError });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        return res.status(codeNotFound).send({ message: cardCastError });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(codeBadRequest).send({ message: cardValidationError });
      }
      return res.status(codeServerError).send({ message: defaultError });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
