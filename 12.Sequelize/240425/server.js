const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

const path = require("path");
const { sequelize, User } = require("./models");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const router = require("./router");

sequelize
  .sync({ force: true })
  .then(() => {
    User.create({
      userId: "qwer",
      pw: "qwer",
      nick: "asdf",
    });
    app.listen(app.get("port"), () =>
      console.log(app.get("port"), "server open")
    );
  })
  .catch((err) => console.error(err));

const app = express();

app.set("port", process.env.PORT || 3080);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));
app.use(cookieParser(process.env.SECRET_COOKIE));
const upload = (img) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, "./uploads");
      },
      filename: (req, fil, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
      },
    }),
  }).array(img);
app.post("/upload", upload("img"), (req, res) => {
  res.redirect("/");
});
app.use(router);
