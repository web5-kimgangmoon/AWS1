export default (req, res) => {
  res.cookie("user", undefined, {
    expires: new Date(Date.now()),
    // httpOnly: true,
    // secure: true,
    // signed: true,
  });
  res.json({ result: "logout" });
  // res.redirect("/");
  // res.send("ok");
};
