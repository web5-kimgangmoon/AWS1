const router = require("express").Router();
const { user } = require("../lib/mysql");

router.post("/regist", (req, res) => {
  user.create(req.body);
  res.redirect("/");
});
router.get("/get", (req, res) => {
  const id = req.query.id ? req.query.id : 1;
  (async () => {
    const result = await user.get(id);
    console.log(result);
    res.redirect("/");
  })();
});

module.exports = router;
