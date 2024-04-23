const router = require("express").Router();

router.get("/", (req, res) => {
  const love = req.cookies.love ? req.cookies.love : "쿠키가 없어요 ㅠㅠ";
  res.render("cookieCheck", { love });
});

module.exports = router;
