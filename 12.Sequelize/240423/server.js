const express = require("express");
require("dotenv").config();
const morgan = require("express");
const cookieParser = require("cookie-parser");

const path = require("path");
const router = require("./router");
const db = require("./models");

db.sequelize.sync({ force: true });

const app = express();

app.set("port", process.env.PORT);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public"));

app.use("/api", router);

app.listen(app.get("port"), () => {
  console.log("server open ", app.get("port"));
});
