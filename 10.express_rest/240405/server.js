const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");

const router = require("./router");

// const upload = multer({
//   Storage: multer.diskStorage({
//     destination: (req, file, callback) => {},
//     filename: (req, file, callback) => {},
//   }),
// });
// const Storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./uploads");
//   },
//   filename: (req, file, callback) => {
//     callback(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// const Storage = multer.diskStorage({
//     destination: (req, file, callback)=> {
//         callback(null, "./uploads");
//     },
//     filename: (req, file, callback) => {
//         callback(null, `${Date.now()}_${file.originalname}`);
//     }
// })
const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});
const uploadRouter = (name) => multer({ Storage }).array(name);

const app = express();
app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
  if (process.env.NODEENV == "deploy") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.post("*/write", uploadRouter("img"));
app.use(router);
console.log(app);

app.listen(app.get("port"), () => {
  console.log("server open " + app.get("port"));
});
