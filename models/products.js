const connection = require('./connection');

async function getAll() {
  const query = 'SELECT id, name, quantity FROM StoreManager.products ORDER BY id ASC';
  const [products] = await connection.execute(query);
  return products;
}

async function getByID(id) {
  const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product;
}

async function getNames() {
  const query = 'SELECT name FROM StoreManager.products';
  const [names] = await connection.execute(query);
  console.log(names.map((n) => n.name));
  return names.map((n) => n.name);
}

async function add(name, quantity) {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VAlUES (?, ?)';
  await connection.execute(query, [name, quantity]);
}

async function update(name, quantity, id) {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);
}

async function remove(id) {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
}

module.exports = { getAll, getByID, getNames, add, update, remove };
