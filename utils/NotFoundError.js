const { NOT_FOUND_MESSAGE } = require('./constants');

class NotFoundError extends Error {
  constructor() {
    super(NOT_FOUND_MESSAGE);
    this.statusCode = 404;
  }
}

module.exports = {
  NotFoundError,
};
