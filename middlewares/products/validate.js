const rescue = require('express-rescue');
// const { getNames } = require('../../services/products');
const validate = require('../../services/validate');

const productName = rescue(async (req, _res, next) => {
  const { name } = req.body;
  // const names = await getNames();
  validate.name(name);
  // if (req.method === 'POST') validate.existantName(names, name);
  next();
});

const productQuantity = (req, _res, next) => {
  const { quantity } = req.body;
  validate.quantity(quantity);
  next();
};

module.exports = { productName, productQuantity };