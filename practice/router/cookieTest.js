const router = require("express").Router();

router.get("/cookieGet", (req, res) => {
  res.cookie("love", "i love cookie!", { maxAge: 10000 });
  res.redirect("/");
});

module.exports = router;
