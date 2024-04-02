const router = require("express").Router();
const fs = require("fs");
const path = require("path");
// console.log(router);
const boards = [
  { id: 1, title: "아아", name: "dd", view: "ㅇㅇ", createdAt: "24.04.02" },
];

router.get("/", (req, res) => {
  const boardHtmlPath = path.join(__dirname, "..", "views", "board.html");
  const boardTemplatePath = path.join(
    __dirname,
    "..",
    "views",
    "boardHtmlTemplate.html"
  );
  const html = fs.readFileSync(boardHtmlPath, { encoding: "utf8" });
  const boardTemplate = fs.readFileSync(boardTemplatePath, {
    encoding: "utf8",
  });

  let tempStr = "";
  //   let tempStr = "";
  const objNames = ["id", "title", "name", "view", "writer", "createdAt"];

  // const names = Object.keys(boards[0]);
  //직접 찾은 열거 가능한 문자열 키 속성 이름에 해당하는 문자열을 요소로 하는 배열을 반환합니다.
  //직접 찾은 열거 가능한 문자열 키 속성 이름에 해당하는 문자열을 요소로 하는 배열을 반환합니다.

  //   let firsthtml = `<html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>게시판</title>
  //     <link rel="stylesheet" href="/static.css" />
  //     <link rel="stylesheet" href="index.css" />
  //   </head>
  //   <body>
  //     <div id="root">
  //       <h1 class="box-center">게시판</h1>
  //       <ul id="list">
  //         <li class="header">
  //             <ul class="row">
  //                 <li class="num box-center">0</li>
  //                 <li class="title">제목</li>
  //                 <li class="wirter box-center">글쓴이</li>
  //                 <li class="createdAt box-center">등록일</li>
  //                 <li class="view box-center">조회수</li>
  //             </ul>
  //       </li>`;

  boards.forEach((item) => {
    let itemStr = boardTemplate;
    objNames.forEach((name) => {
      itemStr = itemStr.replaceAll(`{{${name}}}`, item[name]);
    });
    //     tempStr += `<li class="item">
    //   <a href="/board?id=${item.id}">
    //       <ul class="row">
    //           <li class="num box-center">${item.id}</li>
    //           <li class="title">${item.title}</li>
    //           <li class="wirter box-center">${item.name}</li>
    //           <li class="createdAt box-center">${item.createdAt}</li>
    //           <li class="view box-center">조회수</li>
    //       </ul>
    //   </a>
    // </li>`;
    tempStr += itemStr;
  });
  //   let finalHTML = `</ul>
  //       <div id="nav">
  //         <a href="/write"><button id="write">글쓰기</button></a>
  //       </div>
  //     </div>
  //     <script src="index.js"></script>
  //   </body>
  // </html>`;
  tempStr = html.replace("{{list}}", tempStr);
  res.send(tempStr);
});

router.post("/", (req, res) => {
  console.log("board 정보 필요");
  res.redirect("/");
});

router.post("/like", (req, res) => {
  console.log(req.body.like);
  res.redirect("/");
});
// console.log(router);
module.exports = router;
