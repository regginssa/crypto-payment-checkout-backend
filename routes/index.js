const router = require("express").Router();

router.use("/tx", require("./tx"));
router.use("/address", require("./address"));
router.use("/web3", require("./web3"));

module.exports = router;
