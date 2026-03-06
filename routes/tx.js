const router = require("express").Router();
const { getOne, create, update, remove, search } = require("../controllers/tx");

router.route("/").post(create);
router.route("/search").post(search);
router.route("/:id").get(getOne).put(update).delete(remove);

module.exports = router;
