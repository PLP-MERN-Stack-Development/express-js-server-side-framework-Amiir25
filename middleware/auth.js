const { AuthError } = require('../errors/customErrors');

module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['api-key'];
  const expected = process.env.API_KEY;

  if (!expected) {
    console.warn('Warning: API_KEY not set in environment. Authentication disabled.');
    return next();
  }

  if (!apiKey || apiKey !== expected) {
    return next(new AuthError('Invalid or missing API key'));
  }

  next();
};
