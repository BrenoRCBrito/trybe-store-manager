const router = require('express').Router();
const rescue = require('express-rescue');
const add = require('../middlewares/products/add');
const get = require('../middlewares/products/get');
const update = require('../middlewares/products/update');
const validate = require('../middlewares/products/validate');
const remove = require('../middlewares/products/remove');

router.get('', rescue(get.all));

router.get('/:id', rescue(get.byId));

router.post('', validate.productName, validate.productQuantity, add);

router.put('/:id', validate.productName, validate.productQuantity, update);

router.delete('/:id', remove);

module.exports = router;
