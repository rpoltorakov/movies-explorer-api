class NotFoundError extends Error {
  constructor() {
    super('Not found');
    this.statusCode = 404;
  }
}

module.exports = {
  NotFoundError,
};
