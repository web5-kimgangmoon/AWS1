const router = require("express").Router();
const uploader = require("./uploader");
const basePage = require("./basePage");
const cookieTest = require("./cookieTest");

router.use("/", basePage);
router.use("/cookieTest", cookieTest);
// router.use("/uploader", uploader);
module.exports = router;
