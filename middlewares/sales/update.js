const rescue = require('express-rescue');
const { update, getByID } = require('../../services/sales');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const beforeUpdateSale = await getByID(id);
  if (!beforeUpdateSale) {
    const noSaleError = { status: 404, message: 'Sale not found' };
    throw noSaleError;
  }
  const [{ productId, quantity }] = req.body;
  await update(quantity, id, productId);
  return res.status(200).json({ saleId: Number(id), itemUpdated: req.body });
});