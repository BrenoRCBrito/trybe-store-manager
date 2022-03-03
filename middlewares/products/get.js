const productsService = require('../../services/products');

const all = async (_req, res, _next) => {
  const products = await productsService.getAll();
  if (!products[0]) {
    return res.status(200).json([]); 
  }
  return res.status(200).json(products); 
};

const byId = async (req, res, _next) => {
  const { id } = req.params;
  const [product] = await productsService.getByID(id);
  if (!product) {
    const noProductError = { status: 404, message: 'Product not found' };
    throw noProductError;
  } 
  return res.status(200).json(product);
};

module.exports = { all, byId };