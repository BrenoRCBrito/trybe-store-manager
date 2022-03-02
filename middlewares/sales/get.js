const rescue = require('express-rescue');
const salesService = require('../../services/sales');

const all = rescue(async (_req, res, _next) => {
  const sales = await salesService.getAll();
  if (!sales) {
    return res.status(200).json([]); 
  }
  return res.status(200).json(sales); 
});

const byId = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const sale = await salesService.getByID(id);
  if (!sale[0]) {
    const noSaleError = { status: 404, message: 'Sale not found' };
    throw noSaleError;
  } 
  return res.status(200).json(sale);
});

module.exports = { all, byId };
