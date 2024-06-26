import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import multer from "multer";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import db from "./models";
import { Server } from "socket.io";
import { createServer } from "http";
import fileStore from "session-file-store";

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
  console.log("Hello world");
  client.on("chat", (data) => {
    cat.emit("chat", "앉아");
  });
});

app.arguments((req, res, next) => {
  if (process.env.NODEENV == "deploy") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use(express.urlencoded({ extneded: false }));
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
const FileStore = fileStore(session);
app.use(cookieParser("dklsajdlkasjd"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "dkajdkljads",
    name: "user-session",
    store: new FileStore({
      reapInterval: 10,
      path: "./test",
    }),
    // store : new FileStore({reapInterval:10, path:"./test-session"})
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 10,
      signed: true,
      // expires: new Date(Date.now() + 10 * 1000),
    },
  })
);
app.use(cors({ origin: /http:\/\/localhost*/, credentials: true }));

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
async () => {
  await db.sequelize.sync({ force: true });
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

app.use(express.static("public"));

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

server.listen(app.get("port"), () => {
  console.log("server opens ", app.get("port"));
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

app.use(express.static("public"));

app.get("/ip", (req, res) => {
  console.log(req.connection);
  res.send("concept");
});

// path(router) => Socket,namespace
// queryString || cookie || variable => socket : room
const chat = io.of("chat");
// app.use("/chat",  (req, res) => {}));
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
    // caht.to(2).emit("chat", data);
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
  //     console.log(client.adapter);

  //     console.log(client.rooms);
  //     chat.to(1).emit("chat", data);
  //     client.adapter.rooms.clear();
  //     client.rooms.clear();
  // })
});

io.on("connection", (client) => {
  console.log("client connected");
  io.emit("count", io.engine.clientsCount);
  client.on("disconnect", () => {
    console.log("client disconnet");
    io.emit("count", io.engine.clientsCount);
  });

  client.on("chat", (data) => {
    console.log(data);
    data.count = io.engine.clientsCount;
    io.emit("chat", data);
  });
});

server.listen(8080, () => {
  console.log("server opens 8080");
});

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import multer from "multer";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import db from "./models";
import { Server } from "socket.io";
import { createServer } from "http";
import fileStore from "session-file-store";

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
  console.log("Hello world");
  client.on("chat", (data) => {
    cat.emit("chat", "앉아");
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
      storage: multer.diskStorage({
        destination: (req, file, callback) => {
          callback(null, "./test");
        },
        filename: (req, file, callback) => {
          callback(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  }).array(img);
const FileStore = fileStore(session);
app.use(cookieParser("dkashdsjahd"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "dksajkdlsda",
    name: "user-session",
    store: new FileStore({
      reapInterval: 10,
      path: "./test",
    }),
    // store : new FileStore({reapInterval:10, path:"./test-session"})
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 10,
      signed: true,
      // expires: new Date(Date.now() + 10 * 1000)
    },
  })
);
app.use(cors({ origin: /http:\/\/localhost*/, creadentials: true }));

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
async () => {
  await db.sequelize.sync({ force: true });
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

app.use(express.static("public"));

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

server.listen(app.get("port"), () => {
  console.log("server opens ", app.get("port"));
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

app.use(express.static("public"));

app.get("/ip", (req, res) => {
  console.log(req.connection);
  res.send("concept");
});

// path(count) => Socket,namespace
// queryString || cookie || variable => socket : room
const chat = io.of("chat");
// app.use("/chat", (req, res) => {});
chat.on("connection", (client) => {
  console.log("connected chat");
  client.join(-1);
  // client.join(2);
  client.on("disconnect", () => {
    console.log("client disconnect");
  });

  console.log(client.rooms);

  const temp = new Set();
  console.log(temp);
  temp.add(1);
  console.log(temp);
  temp.add(1);

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
  client.on("chat", (data) => {
    console.log(client.adapter);

    console.log(client.rooms);
    chat.to(1).emit("chat", data);
    client.adapter.rooms.clear();
    client.rooms.clear();
  });
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

server.listen(8080, () => {
  console.log("server opens 8080");
});

import {Model, DataTypes} from "sequelize";

export default class User extends Model{
  static init(sequelize){
    return super.init(
      {
        email:{
          type:DateTYpes.STRING(100),
          unique:true,
          allowNull:false
        },
        pw:{
          type:DataTypes.STRING(64),
          allowNull:false
        },
        nick:{
          type:DataTypes.STRING(30),
          unique:true,
          allowNull:false
        }
      },
      {
        sequelize,
        modelName:"User",
        tableName:"user",
        timestamps:true,
        underscroed:true,
        paranoid:true
      }
    )
  }

  static associate({User, Board}){
    User.hasMany(Board, {
      foreignKey:"userId",
      sourceKey:"id",
      onDelete:"CASCADE",
      
    })
  }
}