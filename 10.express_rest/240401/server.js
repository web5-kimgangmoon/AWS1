const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

dotenv.configDotenv();

// 프로그램과 관련된 내용을 모두 가지고 있다. node를 이용하면 node.js로 본 내용을 볼 수 있다.
console.log(process.env.PORT);
const app = express();

// app.get("/", (req, res, next) => {
//   console.log(req.host);
//   res.send("dsadsa");
//   next();
// });
//캐시로 응답한 페이지다 304 상태 코드

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
// body parser 우리가 받아온 데이터를 객체로 바꿔준다.
// 메서드 호출할 때 객체가 들어간다? << 옵션
// extended : 확장
// | false
// true : 외부 라이브러리를 사용하여 작동한다.(qs library)
// false : Express가 갖고 있는 body parser로 작동한다.(queryString module)
// queryString을 파싱해준다? << form => Content-Type : x-www-form-urlencoded

app.use("/", express.static("public"));
app.use("/imgs", express.static(path.join("uploads")));

app.get("/", (req, res) => {
  // console.log(req.hostname);
  // res.send("qwer");
  res.sendFile(path.join(__dirname, "pulbic/index.html"));
});

app.get("/board", (req, res) => {
  console.log("board 폴더는 없다.");
  // res.send("qwer");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.put("/", (req, res) => {
  res.json({ a: 1 });
});

app.use(express.json());
// Content-Type : application/json

app.set("port", process.env.PORT || 3000);
// global.port = process.env.PORT;
app.listen(app.get("port"), () => {
  console.log(app.get("port") + " port server open");
});
