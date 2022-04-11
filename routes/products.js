const { Router } = require("express");
const validate = require("../middlewares/validate");
const productsController = require("../controllers/products");

const router = Router();

router.get("", productsController.getAll);

router.get("/:id", productsController.getById);

router.post("", validate.products, productsController.create);

router.put("/:id", validate.products, productsController.update);

router.delete("/:id", productsController.destroy);

module.exports = router;
