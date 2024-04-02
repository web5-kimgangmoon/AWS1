const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
// const path = require("path");

const router = require("./router");
// index.js는 첫번째 파일로 인식, 파일명만 적어도 가져올 수 있다.
dotenv.config();
//환경변수 설정

const app = express();
// app 객체를 express 함수로 받아온다.
console.log(app);

app.use(express.urlencoded({ extended: false }));
// urlencoded의 옵션을 설정한다
// body parser 우리가 받아온 데이터를 객체로 바꿔준다.
// 메서드 호출할 때 객체가 들어간다? << 옵션
// extended : 확장
// | false
// true : 외부 라이브러리를 사용하여 작동한다.(qs library)
// false : Express가 갖고 있는 body parser로 작동한다.(queryString module)
// queryString을 파싱해준다? << form => Content-Type: x-www-form-urlencoded

app.use(express.json());
// express의 json 형식을 활성화시켜준다. 자동으로 json 형식으로 변환해준다.
app.use("/", express.static("public"));
// "/"를 public 경로로 바꿔준다.
app.use((req, res, next) => {
  if (process.env.NODEENV == "deploy") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
  // node환경이 dev인지 묻는 것 이것도 가능하다.
  //   morgan은 일종의 함수이기 때문에 가능하다.

  //   if (process.env.NODEENV == "dev") morgan("dev");
  //   // node환경이 dev인지 묻는 것
  //   else morgan("combined");
});

app.use("/api", router);
console.log(app);
//api는 router 객체

// app.get("/board", (req, res) => {
//     res.
// })

// nodemon은 자동으로 실행되며, D옵션으로 인해 개발중에만 사용가능하다.
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("open server" + app.get("port"));
});
