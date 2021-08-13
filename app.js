require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { mongooseConfig } = require('./utils/constants');
const serverErrorMiddleware = require('./errors/error-middleware');
const { endpointCastError, serverThrottlingError } = require('./utils/errors');
const NotFoundError = require('./errors/not-found');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateUserCredentials } = require('./utils/validation');

const { PORT = 3000 } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: serverThrottlingError,
});

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', mongooseConfig);

app.post('/signup', validateUserCredentials, createUser);
app.post('/signin', validateUserCredentials, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError(endpointCastError));
});
app.use(errors());

app.use(serverErrorMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
