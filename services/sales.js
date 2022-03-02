const salesModel = require('../models/sales');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getByID = async (id) => {
  const sale = await salesModel.getByID(id);
  return sale;
};

const getLastSaleId = async () => salesModel.getLastSaleId();

const add = async (id, sales) => salesModel.add(id, sales);

const update = async (quantity, saleId, productId) => salesModel
.update(quantity, saleId, productId);

module.exports = { getAll, getByID, getLastSaleId, add, update };
