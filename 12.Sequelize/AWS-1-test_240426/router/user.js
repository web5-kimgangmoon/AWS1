const router = require("express").Router();
const { selectUsers, insertUsers } = require("./../lib");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/regist", (req, res) => {
  res.render("regist");
});

router.post("/regist", async (req, res) => {
  await insertUsers(req.body.userId, req.body.pw, req.body.nick);
  res.redirect("/user/login");
});

router.post("/login", async (req, res) => {
  const user = await selectUsers(req.body.userId, req.body.pw);
  if (user.userId) {
    res.cookie("user", user.nick);
    res.cookie("userId", user.userId);
  }
  res.redirect("/");
});

router.post("/logout", (req, res) => {
  res.cookie("user", null, { maxAge: 0 });
  res.cookie("userId", null, { maxAge: 0 });
  res.redirect("/");
});

module.exports = router;
