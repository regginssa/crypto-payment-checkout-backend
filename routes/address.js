const router = require("express").Router();
const { getAll } = require("../controllers/address");

router.get("/all", getAll);

module.exports = router;
