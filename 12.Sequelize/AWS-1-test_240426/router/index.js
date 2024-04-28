const router = require("express").Router();
const board = require("./board");
const user = require("./user");

router.use("/user", user);
router.use("/", board);

module.exports = router;
