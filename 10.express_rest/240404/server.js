const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
require("dotenv").config();

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/imgs", express.static("uploads"));

const imgs = [];
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      console.log(1, file);
      callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
      console.log(2, file);
      const tempName = Date.now() + "_" + file.originalname;
      imgs.push(tempName);
      callback(null, tempName);
    },
    //옵션
  }),
});
//디스크에 관한 정보들

app.post("/write", (req, res, next) => {
  if (req.headers.cookie) {
    req.user = req.headers.cookie;
  }
  console.log(imgs);
  next();
});

// post(path:String, ...callback:Array(function))
app.post("/write", upload.array("img"), (req, res) => {
  if (req.headers.cookie) {
    req.user = req.headers.cookie;
  }
  if (res.user) {
    console.log(req.headers);
    console.log(req.body);
    console.log(req.file);
    console.log(req.files);
    //   res.cookies("file", req.file.filename);
  }
  //   console.log(req.cookies);
  //   console.log(req.body);
  //   console.log(req.file);
  //   console.log(res.cookies);
  res.redirect("/");
  //   res.redirect("/");

  //   req.on("data", (data) => {
  //     console.log(data.toString());
  //   });
  //   res.on("end", () => {
  //     res.redirect("/");
  //   });
});

app.listen(app.get("port"), () => {
  console.log("server open " + app.get("port"));
});
