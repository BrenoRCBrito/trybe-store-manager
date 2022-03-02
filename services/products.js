const productsModel = require('../models/products');

const getAll = async () => productsModel.getAll();

const getByID = async (id) => productsModel.getByID(id);

const getNames = async () => productsModel.getNames();

const add = async (name, quantity) => productsModel.add(name, quantity);

const update = async (name, quantity, id) => productsModel.update(name, quantity, id);

const remove = async (id) => productsModel.remove(id);

module.exports = { getAll, getByID, getNames, add, update, remove };