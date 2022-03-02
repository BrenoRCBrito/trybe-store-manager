const rescue = require('express-rescue');
const { add, getLastSaleId } = require('../../services/sales');

module.exports = rescue(async (req, res, _next) => {
  const id = await getLastSaleId();
  await add(id + 1, req.body);
  return res.status(201).json({ id, itemsSold: req.body });
});