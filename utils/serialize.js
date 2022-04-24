module.exports = (sales) => {
  if (sales.sale_id) {
    return {
      saleId: sales.sale_id,
      productId: sales.product_id,
      date: sales.date,
      quantity: sales.quantity,
    };
  }
  return {
    productId: sales.product_id,
    date: sales.date,
    quantity: sales.quantity,
  };
};
