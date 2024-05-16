const router = require("express").Router();
const cookie = require("./cookie.js");
const session = require("./session.js");
const session1 = require("./session1.js");

router.use("/cookie", cookie);
router.use("/session", session);
router.use("/session1", session1);
module.exports = router;

router.use(
    session({
        resave: true, // 기존의 것이 있을 경우, 재저장한다.(maxAge가 리셋된다. ) false면 재저장하지 않는다.
        saveUninitialized: true,
        secret: "test",
        name:"user-session",
        // store: new session.MemoryStore(), 기본 저장소
        store: new FileStore({
            reapInterval: 10, // 파일을 10초 뒤에 삭제한다.
            path: "./test-session", // 세션 저장하는 위치
            // 로컬 파일을 건드리기 때문에 nodemon이 자꾸 재시작된다.
        }),
        cookie: {
            // httpOnly: true,
            // secure: true,
            // signed: true,
            // expires: new Date(Date.now() + 10 * 1000),
            maxAge: 10 * 1000,
        }
    })
)