const router = require("express").Router();

router.get("/", (req, res) => {
  console.log(decodeURI(req.headers.cookie));
  console.log(req.cookies.name);
  console.log(req.signedCookies.name);
  if (req.cookies.name) {
    res.cookie("name", req.cookies.name, { maxAge: 10 * 1000 });
  }
  res.send("cookie를 확인하세요.");
});

router.get("/add", (req, res) => {
  res.cookie("name", "AAA", {
    // maxAge: 10 * 1000, // 기간 설정, 최대 나이 stopwatch
    expires: new Date(Date.now() + 10000), // 기준 설정 alarm
    // path: "/add", // 해당 path에 대해서 설정
    secure: true, // https에 대해서 설정(https면 쿠키 설정), localhost면 무조건 뜬다
    signed: true, // 쿠키를 암호화한다.(난독화)
    httpOnly: true, // http에만? socket 통신 등은 적용되지 않는다.(7계층 application layer)
  });
  res.redirect("/");
});

router.get("/remove", (req, res) => {
  res.cookie("name", "ㅇㅇ", { maxAge: 30 * 60 * 1000 });
  res.redirect("/");
});

module.exports = router;
