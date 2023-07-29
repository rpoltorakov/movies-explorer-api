const { ACCESS_DENIED_MESSAGE } = require('./constants');

class AccessDeniedError extends Error {
  constructor() {
    super(ACCESS_DENIED_MESSAGE);
    this.statusCode = 403;
  }
}

module.exports = {
  AccessDeniedError,
};
