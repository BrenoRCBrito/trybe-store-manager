const router = require('express').Router();
const get = require('../middlewares/sales/get');
const validate = require('../middlewares/sales/validate');
const add = require('../middlewares/sales/add');
const update = require('../middlewares/sales/update');

router.get('', get.all);

router.get('/:id', get.byId);

router.post('', validate.productId, validate.productQuantity, add);

router.put('/:id', validate.productId, validate.productQuantity, update);

module.exports = router;