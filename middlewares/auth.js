const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/UnauthorizedError');

const JWT_SECRET = process.env.NODE_ENV !== 'production' ? 'development-jwt-token' : process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError());
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError());
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
