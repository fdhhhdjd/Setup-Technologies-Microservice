const productCtl = require("../controllers/product.controllers");
const isAuthentication = require("../middlewares/isAuthentication");
const routes = require("restana")();
// routes
routes.post("/product/create", isAuthentication, productCtl.CreateProduct);
routes.post("/product/buy", isAuthentication, productCtl.BuyProduct);
routes.get("/product", productCtl.GetProduct);
module.exports = routes;
