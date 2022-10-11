const router = require("express").Router();
const userCtl = require("../controllers/user.controllers");

router.post("/user/login", userCtl.Login);
router.post("/user/register", userCtl.register);
router.get("/user", userCtl.getUSer);
module.exports = router;
