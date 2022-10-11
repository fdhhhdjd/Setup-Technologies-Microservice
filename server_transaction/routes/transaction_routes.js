const router = require("express").Router();
const transactionCtl = require("../controllers/transaction.controllers");
router.get("/transaction", transactionCtl.getTransaction);
module.exports = router;
