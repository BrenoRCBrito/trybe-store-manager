const salesModel = require("../models/sales");

const getAll = async () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

const create = async (sales) => salesModel.create(sales);

const update = async (quantity, saleId, productId) =>
  salesModel.update(quantity, saleId, productId);

const destroy = async (id) => salesModel.destroy(id);

module.exports = { getAll, getById, create, update, destroy };
