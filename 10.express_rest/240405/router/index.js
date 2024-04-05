const router = require("express").Router();

// const cookieTest = require("./cookie_test");
// router.use(cookieTest);

const user = require("./user");
const board = require("./board");

router.use((req, res, next) => {
  res.templateData = {
    title: "",
    styles: ["/index.css"],
    userTemplate: "",
  };
  // 속성 삽입
  next();
});

router.use("/", board);
router.use("/user", user);
//router를 이용하면 static 미들웨어의 효과도

console.log(router);

module.exports = router;
