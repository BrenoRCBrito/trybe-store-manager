const validate = require('../../services/validate');

const productId = (req, _res, next) => {
  req.body.forEach((sale) => {
    if (!sale.productId) {
      const noProductId = { status: 400, message: '"productId" is required' };
      throw noProductId;
    }
  });
  next();
};

const productQuantity = (req, _res, next) => {
  req.body.forEach((sale) => {
    validate.quantity(sale.quantity);
  });
  next();
};

module.exports = { productId, productQuantity };