const rescue = require('express-rescue');
const productsService = require('../../services/products');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const [productBeforeUpdate] = await productsService.getByID(id);
  if (!productBeforeUpdate) {
    const noProductError = { status: 404, message: 'Product not found' };
    throw noProductError;
  }
  const { name, quantity } = req.body;
  await productsService.update(name, quantity, id);
  return res.status(200).json({ id, name, quantity });
});
