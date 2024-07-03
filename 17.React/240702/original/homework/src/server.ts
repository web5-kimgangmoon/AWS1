import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./controllers/index";
import db from "./models/sequelizeDB";
import cors from "cors";
import path from "path";

(async () => {
  try {
    await db.sequelize.sync({ force: true });
    const transaction = db.sequelize.transaction(async () => {
      // try {
      //   await db.Todo.update({ content: "sas" }, { where: { id: 2 } });
      //   // await db.Todo.create({content:"하"});
      //   // await db.Todo.create({content:"공물을 모아 내 총애를 얻어라"});
      // } catch (err) {
      //   console.error(err);
      // }
    });
  } catch (err) {
    console.error(err);
  }
})();

dotenv.config();
const app: Express = express();
app.use(
  cors({
    origin: [/http:\/\/127.0.0.1:*/, /http:\/\/localhost:*/],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("port", process.env.PORT ? process.env.PORT : 3090);
app.use((req, res, next) => {
  if (process.env.NODE_ENV == "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use(cookieParser(process.env.COOKIESECRET || "assasas"));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/public"));
app.use("/api", router);

// app.get("/", (req, res, next) => {
//   res.send("테스트중");
// });

app.listen(app.get("port"), () => {
  console.log("server open ", app.get("port"));
});
// app.use(express.static("public"));
