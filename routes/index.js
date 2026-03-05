const router = require("express").Router();

router.use("/tx", require("./tx"));
router.use("/address", require("./address"));

module.exports = router;
