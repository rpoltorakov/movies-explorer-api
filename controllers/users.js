const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../utils/NotFoundError');
const { ConflictError } = require('../utils/ConflictError');
const { BadRequestError } = require('../utils/BadRequestError');
const { UnauthorizedError } = require('../utils/UnauthorizedError');

const JWT_SECRET = process.env.NODE_ENV !== 'production' ? 'development-jwt-token' : process.env.JWT_SECRET;

const signup = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError();
      }
      bcrypt.hash(password, 10)
        .then((hashedPassword) => {
          User.create({
            email,
            password: hashedPassword,
            name,
          })
            .then((createdUser) => res.status(201).send(createdUser.receiveUser()))
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new BadRequestError());
              } else if (err.code === 11000) {
                next(new ConflictError());
              } else {
                next(err);
              }
            });
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError());
      } else {
        next(err);
      }
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError();
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError();
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
          res.cookie('jwt', token, {
            expiresIn: '7d',
            httpOnly: true,
            sameSite: true,
          });
          res.status(200).send({ data: user.receiveUser() });
        })
        .catch(next);
    })
    .catch(next);
};

const signout = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then(() => {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).send({});
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};

const patchCurrentUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

module.exports = {
  signup,
  signin,
  signout,
  getCurrentUser,
  patchCurrentUser,
};
