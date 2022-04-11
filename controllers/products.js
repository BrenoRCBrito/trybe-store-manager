const productsService = require("../services/products");

const getAll = async (_req, res, _next) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (!product) {
    return next({ status: 404, message: "Product not found" });
  }
  return res.status(200).json(product);
};

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const alreadyExist = Boolean(await productsService.getByName(name));
  if (alreadyExist) {
    return next({ status: 409, message: "Product already exists" });
  }
  const insertedProduct = await productsService.create(name, quantity);
  return res.status(201).json(insertedProduct);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const productBeforeUpdate = await productsService.getById(id);
  if (!productBeforeUpdate) {
    return next({ status: 404, message: "Product not found" });
  }
  const updatedProduct = await productsService.update(id, name, quantity);
  return res.status(200).json(updatedProduct);
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  const successfulDestruction = await productsService.destroy(id);
  if (!successfulDestruction) {
    return next({ status: 404, message: "Product not found" });
  }
  return res.status(204).end();
};

module.exports = { getAll, getById, create, update, destroy };
