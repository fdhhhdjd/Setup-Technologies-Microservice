const transactionCtl = require("../controllers/transaction.controller");
const router = require("restana")();
router.get("/transaction", transactionCtl.GetTransaction);
module.exports = router;
