const userCtl = require("../controllers/user.controllers");
const router = require("restana")();

router.post("/user/login", userCtl.Login);
router.post("/user/register", userCtl.register);
router.get("/user", userCtl.getUSer);
module.exports = router;
