const { CONFLICT_MESSAGE } = require('./constants');

class ConflictError extends Error {
  constructor() {
    super(CONFLICT_MESSAGE);
    this.statusCode = 409;
  }
}

module.exports = {
  ConflictError,
};
