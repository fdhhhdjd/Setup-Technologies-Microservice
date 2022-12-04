const router = require("express").Router();
const productCtl = require("../controllers/product.controllers");
const isAuthentication = require("../middlewares/isAuthentication");
router.post("/product/create", isAuthentication, productCtl.CreateProduct);
router.post("/product/buy", isAuthentication, productCtl.BuyProduct);
router.get("/product", productCtl.GetProduct);

module.exports = router;
