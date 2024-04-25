const router = require("express").Router();

//왠만하면 그냥 use로 가져와주자, 그렇지 않으면 query매개변수나 params를 받지 못한다.
router.use("/api", require("./api"));
router.use("/", require("./view"));
module.exports = router;
