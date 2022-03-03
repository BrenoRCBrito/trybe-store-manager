const connection = require('./connection');

const serialize = (sales) => {
  if (sales.sale_id) {
 return { saleId: sales.sale_id,
    productId: sales.product_id,
    date: sales.date,
    quantity: sales.quantity }; 
}
  return {
    productId: sales.product_id,
    date: sales.date,
    quantity: sales.quantity,
  };
};

async function getAll() {
  const query = `SELECT s.date, sp.sale_id, sp.product_id, sp.quantity 
  FROM sales AS s INNER JOIN sales_products AS sp 
  ON s.id = sp.sale_id ORDER BY sale_id ASC, product_id ASC`;
  const [sales] = await connection.execute(query);
  return sales.map(serialize);
}

async function getByID(id) {
  const query = `SELECT s.date, sp.product_id, sp.quantity 
  FROM sales AS s INNER JOIN sales_products AS sp 
  ON s.id = sp.sale_id WHERE s.id = ? ORDER BY sale_id ASC, product_id ASC`;
  const [sale] = await connection.execute(query, [id]);
  console.log(sale);
  return sale.map(serialize);
}

async function getLastSaleId() {
  const query = 'SELECT id FROM StoreManager.sales ORDER BY id DESC LIMIT 1';
  const [[lastId]] = await connection.execute(query);
  return lastId.id;
}

async function add(id, sales) {
  const query1 = 'INSERT INTO StoreManager.sales () VALUES ()';
  await connection.execute(query1);
  const query2 = `INSERT INTO StoreManager.sales_products
   (sale_id, product_id, quantity) VALUES(?, ?, ?)`;
  sales.forEach(async (sale) => {
    await connection.execute(query2, [id, sale.productId, sale.quantity]);
  });
}

async function update(quantity, saleId, productId) {
  const query = `UPDATE StoreManager.sales_products 
  SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
  await connection.execute(query, [quantity, saleId, productId]);
}

module.exports = { getAll, getByID, getLastSaleId, add, update };