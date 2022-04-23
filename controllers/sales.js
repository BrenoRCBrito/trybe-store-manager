const salesService = require('../services/sales');
const productsService = require('../services/products');

const validateQuantity = async (req, _res, next) => {
  const products = await Promise.all(
    req.body.map(async (sale) => productsService.getById(sale.productId)),
  );
  try {
    products.forEach((product, i) => {
      if (req.body[i].quantity > product.quantity) {
        const quantityError = {
          status: 422,
          message: 'Such amount is not permitted to sell',
        };
        throw quantityError;
      }
    });
    return next();
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, _next) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const sales = await salesService.getById(id);
  const [sale] = sales;
  if (!sale) {
    return next({ status: 404, message: 'Sale not found' });
  }
  return res.status(200).json(sales);
};

const create = async (req, res, _next) => {
  const insertedSale = await salesService.create(req.body);
  return res.status(201).json(insertedSale);
};

const update = async (req, res, _next) => {
  const { id } = req.params;
  const [{ quantity, productId }] = req.body;
  console.log(req.body);
  console.log(quantity, productId);
  const updatedSale = await salesService.update(quantity, id, productId);
  return res.status(200).json(updatedSale);
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  const successfulDestruction = await salesService.destroy(id);
  if (!successfulDestruction) {
    return next({ status: 404, message: 'Sale not found' });
  }
  return res.status(204).end();
};

module.exports = { getAll, getById, create, update, destroy, validateQuantity };
