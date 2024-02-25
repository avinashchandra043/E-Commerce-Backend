const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");

router.get("/", productController.getAllProducts);
router.get("/id/:id", productController.findProductById);

module.exports = router;
