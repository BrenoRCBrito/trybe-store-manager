const productsModel = require("../models/products");

const getAll = async () => productsModel.getAll();

const getById = async (id) => productsModel.getById(id);

const getByName = async (name) => productsModel.getByName(name);

const create = async (name, quantity) => productsModel.create(name, quantity);

const update = async (id, name, quantity) =>
  productsModel.update(id, name, quantity);

const destroy = async (id) => productsModel.destroy(id);

module.exports = { getAll, getById, getByName, create, update, destroy };
