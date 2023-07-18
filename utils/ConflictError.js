class ConflictError extends Error {
  constructor() {
    super('Указанный email уже существует');
    this.statusCode = 409;
  }
}

module.exports = {
  ConflictError,
};
