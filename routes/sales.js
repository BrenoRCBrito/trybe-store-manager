const { Router } = require('express');
const validate = require('../middlewares/validate');
const salesController = require('../controllers/sales');

const router = Router();

router.get('', salesController.getAll);

router.get('/:id', salesController.getById);

router.post(
  '',
  validate.sales,
  salesController.validateQuantity,
  salesController.create,
);

router.put('/:id', validate.sales, salesController.update);

router.delete('/:id', salesController.destroy);

module.exports = router;
