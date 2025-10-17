const { AppError } = require('../errors/customErrors');

module.exports = (err, req, res, next) => {
  if (!(err instanceof AppError)) {
    console.error('Unexpected error:', err);
    err = new AppError('Internal Server Error', 500);
  }

  res.status(err.statusCode).json({
    status: 'error',
    message: err.message,
    statusCode: err.statusCode,
  });
};
