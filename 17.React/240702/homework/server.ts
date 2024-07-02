import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./controllers/index";
import path from "path";

dotenv.config();
const app: Express = express();

app.set("port", process.env.PORT ? process.env.PORT : 3090);
app.use((req, res, next) => {
  if (process.env.NODE_ENV == "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIESECRET));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/public"));
app.use("/api", router);

app.listen(app.get("port"), () => {
  console.log("server open ", app.get("port"));
});

// app.use(express.static("public"));
