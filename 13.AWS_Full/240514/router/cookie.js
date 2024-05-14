const router = require("express").Router();
const crypto = require("crypto");

const sessions = {};

(async () => {
  const salt = (await crypto.randomBytes(64)).toString("base64");
})();
router.get("/set", (req, res) => {
  const id = Date.now();
  res.cookie("user", id, {
    expires: new Date(Date.now() + 10000),
    signed: true,
  });
  sessions[id] = 1;
  res.send("setting session");
});

router.get("/get", (req, res) => {
  console.log(req.signedCookies.user);
  res.send({ user: sessions[req.signedCookies.user] });
});

module.exports = router;
