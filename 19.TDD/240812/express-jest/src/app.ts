import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.set("port", process.env.PORT ? process.env.PORT : "3080");

app.get("/", (req, res) => {
  res.status(200).send("AWS's Members");
});
app.listen(app.get("port"), () => {
  console.log("port opens ", app.get("port"));
});
export default app;
