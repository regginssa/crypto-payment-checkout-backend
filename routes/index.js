const router = require("express").Router();

router.use("/tx", require("./tx"));

module.exports = router;
