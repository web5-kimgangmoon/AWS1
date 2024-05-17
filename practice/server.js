const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const db = require("./models");
const { Server } = require("socket.io");
const { createServer } = require("http");
const FileStore = require("session-file-store")(session);
const app = express();

dotenv.config();

app.set("port", process.env.PORT || 3080);

const server = createServer(app);
server.listen(app.get("port"), () => {
  console.log("server opens ", app.get("port"));
});

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

const cat = io.of("cat");

cat.on("connection", (client) => {
  console.log("hello world!!!");
  client.on("chat", (data) => {
    cat.emit("chat", "앉아!");
  });
});

app.use((req, res, next) => {
  if (process.env.NODEENV == "deploy") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const upload = (img) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, "./test");
      },
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
      },
    }),
  }).array(img);

app.use(cookieParser("dkajsdls;akjdasdj"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "dkajsdlasjd",
    name: "user-session",
    store: new FileStore({
      reapInterval: 10,
      path: "./test",
    }),
    // store : new FileStore({ reapInterval: 10, path: "./test-session"})
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 10,
      signed: true,
      // expires: new Date(Date.now() + 10 * 1000),
    },
  })
);
app.use(cors({ origin: "http://localhost", credentials: true }));

app.get("/session", (req, res) => {
  console.log(res.session);
  req.session.user = "kk";
  res.redirect("/");
});
app.get("/cookie", (req, res) => {
  res.cookie("user", "hey", {
    signed: true,
    maxAge: 1000 * 10,
  });
  res.redirect("/");
});
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "template"));
app.post("/upload", upload("img"), (req, res) => {
  console.log("보내짐");
  res.redirect("/");
});

/////////////////
//
(async () => {
  db.sequelize.sync({ force: false });
})();
