const connection = require('./connection');

const serialize = require('../utils/serialize');

const getAll = async () => {
  const query = `SELECT s.date, sp.sale_id, sp.product_id, sp.quantity 
  FROM StoreManager.sales AS s INNER JOIN StoreManager.sales_products AS sp 
  ON s.id = sp.sale_id ORDER BY sale_id ASC, product_id ASC`;
  const [sales] = await connection.execute(query);
  return sales.map(serialize);
};

const getById = async (id) => {
  const query = `SELECT s.date, sp.product_id, sp.quantity 
  FROM StoreManager.sales AS s INNER JOIN StoreManager.sales_products AS sp 
  ON s.id = sp.sale_id WHERE s.id = ? ORDER BY sale_id ASC, product_id ASC`;
  const [sale] = await connection.execute(query, [id]);
  return sale.map(serialize);
};

const create = async (sales) => {
  const query1 = 'INSERT INTO StoreManager.sales () VALUES ()';
  const [insertedSale] = await connection.execute(query1);
  const { insertId: id } = insertedSale;
  const query2 = `INSERT INTO StoreManager.sales_products
   (sale_id, product_id, quantity) VALUES(?, ?, ?)`;
  sales.forEach(async (sale) => {
    await connection.execute(query2, [id, sale.productId, sale.quantity]);
    const query3 = 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?';
    await connection.execute(query3, [sale.quantity, sale.productId]);
  });
  return { id, itemsSold: [...sales] };
};

const update = async (quantity, saleId, productId) => {
  const query = `UPDATE StoreManager.sales_products 
  SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
  await connection.execute(query, [quantity, saleId, productId]);
  return { saleId: Number(saleId), itemUpdated: [{ productId, quantity }] };
};

const destroy = async (id) => {
  const query1 = `SELECT sale_id, product_id, quantity 
  FROM StoreManager.sales_products WHERE sale_id = ?`;
  const [salesProducts] = await connection.execute(query1, [id]);
  salesProducts.forEach(async (salesProduct) => {
    const query2 = 'UPDATE StoreManager.products SET quantity = quantity + ? WHERE id = ?';
    await connection.execute(query2, [
      salesProduct.quantity,
      salesProduct.product_id,
    ]);
  });
  const query3 = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [{ affectedRows: salesAffectedRows }] = await connection.execute(
    query3,
    [id],
  );
  const successfulDestruction = Boolean(salesAffectedRows);
  return successfulDestruction;
};

module.exports = { getAll, getById, create, update, destroy };
