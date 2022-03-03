const router = require('express').Router();
const rescue = require('express-rescue');
const get = require('../middlewares/sales/get');
const validate = require('../middlewares/sales/validate');
const add = require('../middlewares/sales/add');
const update = require('../middlewares/sales/update');

router.get('', rescue(get.all));

router.get('/:id', rescue(get.byId));

router.post('', validate.productId, validate.productQuantity, add);

router.put('/:id', validate.productId, validate.productQuantity, update);

module.exports = router;