const router = require("express").Router();
const board = require("./board");

// console.log(router);
router.use("/board", board);
// console.log(router);
module.exports = router;
