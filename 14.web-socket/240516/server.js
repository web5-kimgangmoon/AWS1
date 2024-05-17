import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

app.use(express.static("public"));

// app.get("/ip", (req, res) => {
//   console.log(req.connection);
//   res.send("concept");
// });

// path(router) => socket, namespace
// queryString || cookie || variable => socket : room
const chat = io.of("chat");
//app.use("/chat", (req, res) => {}))
chat.on("connection", (client) => {
  console.log("connected chat");
  client.join(-1);
  // client.join(2);
  client.on("disconnect", () => {
    console.log("client disconnect");
  });

  console.log(client.rooms);

  // const temp = new Set();
  // console.log(temp);
  // temp.add(1);
  // console.log(temp);
  // temp.add(1);
  // console.log(temp);

  client.on("chat", (data) => {
    let now = [...client.rooms][0];
    console.log(now);
    if (data.room !== now) {
      // client.rooms.clear();
      client.join(data.room);
      now = data.room;
    }
    console.log(data);
    // chat.to(now).emit("chat", data);
    client.emit("chat", { name: "나", chat: data.chat });
    client.broadcast.to(now).emit("chat", { name: data.name, chat: data.chat });
    client.emit("client", client.id);
    // chat.to(1).emit("chat", data);
    // chat.to(2).emit("chat", data);
    // client.leave(1);
    // client.rooms.clear();
    // console.log(client.rooms);
    // io.to(); // 개인 룸에 보낼 수 있음, 개인 룸은 개인 ID를 기반으로 함
    console.log(client.id);

    if (data.id) {
      client.join(data.id);
    }
    chat.to(data.id).emit("chat", { name: "자신에게", chat: "자기가" });
  });
  // client.on("chat", (data) => {
  //   console.log(client.adapter);

  //   console.log(client.rooms);
  //   chat.to(1).emit("chat", data);
  //   client.adapter.rooms.clear();
  //   client.rooms.clear();
  // });
});

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
