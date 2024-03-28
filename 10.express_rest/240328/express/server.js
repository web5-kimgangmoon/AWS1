const express = require("express");
const path = require("path");

const app = express();
const boardRoot = path.join(__dirname, "..", "board");
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

app.listen(3000, () => {
  console.log("server open 3000 Port express library");
});
