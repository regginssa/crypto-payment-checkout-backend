const router = require("express").Router();
const { verify } = require("../controllers/web3");

router.post("/verify", verify);

module.exports = router;
