const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { category, list } = require("./data/initialData.js");
const db = require("./models");

db.sequelize
  .sync({ force: true })
  .then(() => {
    db.sequelize.transaction(async (transaction) => {
      // find를 이용하려했지만, 배열을 자꾸 자동으로 String으로 캐스팅하는 바람에
      // 쓰지 못하게 됐다.
      const user = ["무덤지기"];
      // for (let item of header.topList) {
      //   await db.TopList.create(item, { transaction });
      // }
      // for (let item of header.subList) {
      //   await db.SubList.create(item, { transaction });
      // }
      for (let { href, name } of category) {
        await db.Category.create({ href, name }, { transaction });
      }
      let count = 1;
      for (let item of user) {
        await db.User.create(
          { nick: item, userId: count++, pw: "1234" },
          { transaction }
        );
      }
      for (const { title, content } of list) {
        await db.Board.create(
          { title, content, userId: 1, categoryId: 1 },
          { transaction }
        );
      }
    });

    app.listen(app.get("port"), () => {
      console.log("server opens ", app.get("port"));
    });
  })
  .catch((err) => console.error(err));

const router = require("./router");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "public");

app.use(express.static("public"));
app.use(router);
