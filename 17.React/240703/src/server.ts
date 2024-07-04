import express, { Express } from "express";
import dotenv from "dotenv";
import { sequelize, Todo } from "./models";
import router from "./router";
import cors from "cors";

dotenv.config({ path: "./src/.env" });

const app: Express = express();
app.set("port", process.env?.PORT ? process.env?.PORT : 3080);
app.use(
  cors({
    // origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    // credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

(async () => {
  await sequelize.sync({ force: true });
})();

// {
//     origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
//     credentials: true,
//   }

app.use("/api", router);

// app.get("/", (req, res, next) => {
//   console.log("확인됨");
//   res.send("ㅇㅇ");
// });

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "server open");
});
