const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
  if (process.env.NODE_ENV == "deploy") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("views"));

const boards = [
  { id: 1, title: "오늘도 도시락", writer: "이정배", createdAt: "2024-04-03" },
  { id: 1, title: "편점 ㄱ?", writer: "이승배", createdAt: "2024-04-03" },
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "오늘의 점심",
    name: "김강문",
    elem: '<div style="color: red">제육볶음</div>',
    boards,
  });
});

app.listen(app.get("port"), () => {
  console.log("PORT is opended " + app.get("port"));
});
