const express = require("express");
const router = express.Router();
const auth_gateway_middleware = require("../middlewares/auth_service_middleware");
const gatewayCtl = require("../controllers/gateway.controller");
router.all(
  "/:apiName/:path",
  auth_gateway_middleware,
  gatewayCtl.GatewayHandleAllRoutes
);
module.exports = router;

module.exports = router;
