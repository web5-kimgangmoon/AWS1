const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

// const path = require("path");
// const multer = require("multer");
const cookieParser = require("cookie-parser");

const mysql = require("./lib/mysql");
const router = require("./router");

mysql.init();

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/template"));
app.use(cookieParser(process.env.SECRET_KEY));
// const upload = (img)=> multer({storage: multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "./uploads");
//     },
//     filename: (req, file, callback) => {
//         callback(null, `${Date.now()}_${file.originalname}`);
//     }
// })}).array(img);
// app.post("/upload", upload("img"), (req, res) => {
//     res.redirect("/");
// });
app.use(express.static("public"));
app.use("/api", router);

app.listen(app.get("port"), () => {
  console.log("server open ", app.get("port"));
});
