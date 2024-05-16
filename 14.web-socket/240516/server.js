import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

app.use(express.static("public"));

// app.get("/ip", (req, res) => {
//   console.log(req.connection);
//   res.send("concept");
// });

io.on("connection", (client) => {
  console.log("client connected");
  io.emit("count", io.engine.clientsCount);
  client.on("disconnect", () => {
    console.log("client disconnect");
    io.emit("count", io.engine.clientsCount);
  });

  client.on("chat", (data) => {
    console.log(data);
    data.count = io.engine.clientsCount;
    io.emit("chat", data);
  });
});

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
server.listen(8080, () => {
  console.log("server opens 8080");
});
