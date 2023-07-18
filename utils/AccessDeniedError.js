class AccessDeniedError extends Error {
  constructor() {
    super('Access denied');
    this.statusCode = 403;
  }
}

module.exports = {
  AccessDeniedError,
};
