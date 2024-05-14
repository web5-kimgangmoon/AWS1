const router = require("express").Router();
const session = require("express-session");
const FileStore = require("session-file-store")(session);

router.use(
  session({
    resave: true, // 기존의 것이 있을 경우, 재저장한다.(maxAge가 리셋된다.) false면 재저장하지 않는다.
    saveUninitialized: true,
    secret: "test",
    name: "board-session", // connect.sid 세션 id
    // store: new session.MemoryStore(), 기본 저장소
    store: new FileStore({
      reapInterval: 10, // 파일을 10초 뒤에 삭제한다.
      path: "./test-session", // 세션 저장하는 위치
      // 로컬 파일을 건드리기 때문에 nodemon이 자꾸 재시작된다.
    }),
    cookie: {
      //   httpOnly: true,
      //   secure: true,
      //   signed: true,
      // expires: new Date(Date.now() + 10 * 1000),
      maxAge: 10 * 1000,
    },
  })
);

router.get("/set1", (req, res) => {
  console.log(req.session);
  req.session.board = "board";
  console.log(req.session.id); // 무작위로 뽑힌 문자열
  res.send("setting session");
});

module.exports = router;
