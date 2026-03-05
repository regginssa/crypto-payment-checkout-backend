const router = require("express").Router();
const { getOne, create, update, remove } = require("../controllers/tx");

router.route("/").post(create);
router.route("/:id").get(getOne).put(update).delete(remove);

module.exports = router;
