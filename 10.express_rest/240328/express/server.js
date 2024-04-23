const express = require("express");
const path = require("path");

const app = express();
const boardRoot = path.join(__dirname, "..", "board");

app.use((req, res, next) => {
  // get, post, put, patch, delete << Rest API의 method 모두 대응
  console.log("middleware");
  //res.send("middleware"); //<< express에서는 이렇게 쓰지 말라고 한다.
  next();
  // next();
});
// app.all() // use랑 같다 << send, sendFile 등 데이터를 응답하기 위해 사용한다.
// use는 처음, all은 마지막에 써주자

// app.use((req, res, next) => {
//   console.log("middleware");

//   next();
// });
// app.use("/board", (req, res, next) => {
//   console.log("root middleware");

//   next();
// });

// rest api는 모두 middleware다.

app.get("/", (req, res) => {
  res.end("now testing express server");
});

app.get("/board", (req, res) => {
  // res.end("게시판 구현중"); //end는 스트링만 가능
  //res.send("게시판 구현중");
  res.sendFile(path.join(boardRoot, "board.html"));
});

app.get("/board.css", (req, res) => {
  res.sendFile(path.join(boardRoot, "board.css"));
});

app.get("/board.js", (req, res) => {
  res.sendFile(path.join(boardRoot, "board.js"));
});

app.get("/test", (req, res, next) => {
  req.test = {};
  next();
});
app.get("/test", (req, res, next) => {
  req.test.a = 1;
  next();
});
app.get("/test", (req, res, next) => {
  req.test.b = "istest";
  next();
});
app.get("/test", (req, res) => {
  res.json(req.test);
});
app.all("/*", (req, res) => {
  res.send("구현 사항 없음");
});

// 해당 되지 않으면(오류가 날 경우에 all이 실행된다.)

app.listen(3000, () => {
  console.log("server open 3000 Port express library");
});
