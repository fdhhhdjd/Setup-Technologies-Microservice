const router = require("express").Router();
const versionCtl = require("../controllers/version.controller");
const { redirectVersion } = require("../middlewares/redirectVersion");

router.get("/version", redirectVersion({
    '2020-12-01': versionCtl.versionV1,
    '2022-12-01': versionCtl.versionV2
}));
module.exports = router;
