import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import { Category, sequelize } from "./models/index.js";

// import router, { temp, temp1, temp2, temp3 } from "./router/index.js";
import router from "./controller/index.js";
console.log(Category);
// MVC 패턴

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3080);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_COOKIE || "aws"));
app.use(express.static("public"));
app.use(router);
// const upload = (img)=> multer({
//     storage:multer.diskStorage({
//         destination:(req, file, callback)=>{
//             callback(null, "./upload");
//         },
//         filename:(req, file, callback)=>{
//             callback(null, `${Date.now()}_${file.fileoriginalname}`);
//         }
//     })
// }).array(img);

// app.post("/upload", upload("img"), (req, res, next)=>{
//     res.redirect("/");
// })

const force = true;

try {
  await sequelize.sync({ force });
  // ECMAScript 2022 버전부터 가능
  // ES6 ECMAScript2016
  await Category.create({ name: "전체", href: "./" });
  const info = await Category.create({ name: "정보", href: "./" });
  // const opgg=await Category.create({name:"OP.GG 기획", href:"./"});
  // info.addCategory(opgg);
  // const news = await Category.create({name:"유저 뉴스" , href:"./"});
  // info.addCategory(news);
  await info.addCategory(
    await Category.create({ name: "OP.GG 기획", href: "./" })
  );
  await info.addCategory(
    await Category.create({ name: "유저 뉴스", href: "./" })
  );
  await info.addCategory(
    await Category.create({ name: "팁과 노하우", href: "./" })
  );
  info.addCategory(await Category.create({ name: "패치노트", href: "./" }));
  const comm = await Category.create({ name: "커뮤니티", href: "./" });
  await comm.addCategory(await Category.create({ name: "자유", href: "./" }));
  await comm.addCategory(await Category.create({ name: "유머", href: "./" }));
  await comm.addCategory(await Category.create({ name: "질문", href: "./" }));
  await comm.addCategory(await Category.create({ name: "영상", href: "./" }));
  await comm.addCategory(
    await Category.create({ name: "사건 사고", href: "./" })
  );
  await comm.addCategory(
    await Category.create({ name: "전적 인증", href: "./" })
  );
  await comm.addCategory(
    await Category.create({ name: "팬 아트", href: "./" })
  );

  const eSports = await Category.create({ name: "e스포츠", href: "./" });
  await eSports.addCategory(await Category.create({ name: "LCK", href: "./" }));
  await eSports.addCategory(
    await Category.create({ name: "기타 리그", href: "./" })
  );
  app.listen(app.get("port"), () => {
    console.log("server opened " + app.get("port"));
  });
} catch (err) {
  console.error(err);
}

// sequelize
//   .sync({ force })
//   .then(() => {
//     return Category.create({ name: "전체", href: "./" });
//   })
//   .then(() => {
//     return Category.create({ name: "정보", href: "./" });
//   })
//   .then((cate) => {
//     tempCate = cate;

//     return Category.create({ name: "OP.GG 기획", href: "./" });
//   }).then((cate) =>{
//     tempCate = cate;
//     return
//   })
//   .then((cate) => {
//     const tempCate = Category.create({ name: "유저 뉴스", href: "./" });
//     cate.addCategory(tempCate);
//     return cate;
//   })
//   .then(() => {
//     app.listen(app.get("port"), () => {
//       console.log("server opens " + app.get("port"));
//     });
//   });

// import express from "express";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import multer from "multer";
// import router from "router";

// dotenv.config();
// const app = express();

// app.set("port", process.env.PORT);
// app.use(morgan("dev"));
// app.use(express.urlencoded({extended:false}));
// app.use(express.json());
// app.use(cookieParser(process.env.SECRET_PROCESS))
// app.use(express.static("public"));
// app.use(router);

// app.listen(app.get("port"), () => {
//     console.log("server opened " + app.get("port"));
// })
