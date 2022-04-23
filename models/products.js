const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products ORDER BY id ASC';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const getByName = async (name) => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE name = ?';
  const [[product]] = await connection.execute(query, [name]);
  return product;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VAlUES (?, ?)';
  const [{ insertId: id }] = await connection.execute(query, [name, quantity]);
  const insertedProduct = { id, name, quantity };
  return insertedProduct;
};

const update = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);
  const updatedProduct = { id, name, quantity };
  return updatedProduct;
};

const destroy = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [id]);
  const successfulDestruction = Boolean(affectedRows);
  return successfulDestruction;
};

module.exports = { getAll, getById, getByName, create, update, destroy };
