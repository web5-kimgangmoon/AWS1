const router = require("express").Router();
const { User } = require("../../models");

router.post("/regist", async (req, res) => {
  try {
    console.log(req.body);
    await User.create(req.body);
  } catch (err) {
    console.error(err);
  }
  res.redirect("/");
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: req.body,
    });
    if (user) {
      res.cookie("user", user?.nick);
      res.cookie("userId", user.id);
    }
  } catch (err) {
    console.error(err);
  }
  res.redirect("/");
});

router.post("/logout", async (req, res) => {
  try {
    res.cookie("user", null, { maxAge: 0 });
    res.cookie("userId", null, { maxAge: 0 });
  } catch (err) {
    console.error(err);
  }
  res.redirect("/");
});

module.exports = router;
