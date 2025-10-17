const { ValidationError } = require('../errors/customErrors');

function validateProductBody(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  const missing = [];

  if (name === undefined) missing.push('name');
  if (description === undefined) missing.push('description');
  if (price === undefined) missing.push('price');
  if (category === undefined) missing.push('category');
  if (inStock === undefined) missing.push('inStock');

  if (missing.length) {
  return next(new ValidationError(`Missing required fields: ${missing.join(', ')}`));
  }

  if (typeof name !== 'string' || name.trim() === '') {
   return next(new ValidationError('name must be a non-empty string'));
  }

  if (typeof description !== 'string') {
    return next(new ValidationError('description must be a string'));
  }

  if (typeof price !== 'number' || Number.isNaN(price) || price < 0) {
    return next(new ValidationError('price must be a non-negative number'));
  }

  if (typeof category !== 'string' || category.trim() === '') {
    return next(new ValidationError('category must be a non-empty string'));
  }

  if (typeof inStock !== 'boolean') {
    return next(new ValidationError('inStock must be a boolean'));
  }

  next();
}

module.exports = {
  validateProductBody,
};
