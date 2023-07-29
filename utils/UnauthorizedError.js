const { UNAUTHORIZED_MESSAGE } = require('./constants');

class UnauthorizedError extends Error {
  constructor() {
    super(UNAUTHORIZED_MESSAGE);
    this.statusCode = 401;
  }
}

module.exports = {
  UnauthorizedError,
};
