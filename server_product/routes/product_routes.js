const router = require("express").Router();
const productCtl = require("../controllers/product.controllers");
const isAuthentication = require("../middlewares/isAuthentication");
router.post("/product/create", isAuthentication, productCtl.CreateProduct);
router.post("/product/buy", isAuthentication, productCtl.BuyProduct);
module.exports = router;
