class BadRequestError extends Error {
  constructor() {
    super('Bad request');
    this.statusCode = 400;
  }
}

module.exports = {
  BadRequestError,
};
