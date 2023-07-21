const { celebrate, Joi } = require('celebrate');

const urlRegEx = /^(https?:\/\/)(www\.)?([a-z0-9-]{2,}\.)+[a-z]{2,}\/?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/i;

const validatorSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const validatorLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatorUpdateCurrentUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
});

const validatorCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegEx),
    trailerLink: Joi.string().required().regex(urlRegEx),
    thumbnail: Joi.string().required().regex(urlRegEx),
    owner: Joi.string().required().hex(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validatorDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validatorSignup,
  validatorLogin,
  validatorUpdateCurrentUser,
  validatorCreateMovie,
  validatorDeleteMovie,
};
