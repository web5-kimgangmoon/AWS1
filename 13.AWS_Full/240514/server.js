const express = require("express");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const router = require("./router");

const app = express();

app.use(cookieParser("test"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log("server opens ", 3000);
});
