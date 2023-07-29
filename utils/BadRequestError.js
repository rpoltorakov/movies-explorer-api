const { BAD_REQUEST_MESSAGE } = require('./constants');

class BadRequestError extends Error {
  constructor() {
    super(BAD_REQUEST_MESSAGE);
    this.statusCode = 400;
  }
}

module.exports = {
  BadRequestError,
};
