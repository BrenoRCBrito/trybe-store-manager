const rescue = require('express-rescue');
const { add, getAll } = require('../../services/products');

module.exports = rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  const productsQuantity = (await getAll()).length;
  await add(name, quantity);
  return res.status(201).json({ id: productsQuantity + 1, name, quantity });
});