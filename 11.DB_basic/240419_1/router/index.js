const router = require("express").Router();
const board = require("./board");
const user = require("./user");

router.use("/", board);
router.use("/user", user);

module.exports = router;
