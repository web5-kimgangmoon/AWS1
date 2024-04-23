const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");

const router = require("./router/router");
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
app.set("views", path.join(__dirname, "/template"));
// const upload = (img) =>
//   multer({
//     storage: multer.diskStorage({
//       destination: (req, file, callback) => {
//         callback(null, "./uploads");
//       },
//       filename: (req, file, callback) => {
//         callback(null, `${Date.now()}_${file.originalname}`);
//       },
//     }),
//   }).array(img);
// app.post("/", upload("img"));
app.use(cookieParser(process.env.SECRET_KEY));

app.use(router);

app.listen(app.get("port"), () => {
  console.log("server open " + app.get("port"));
});
