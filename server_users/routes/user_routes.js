const router = require("express").Router();
const userCtl = require("../controllers/user.controllers");

router.get("/user/server", userCtl.getUSer);
router.post("/user/login", userCtl.Login);
router.post("/user/register", userCtl.register);
module.exports = router;
