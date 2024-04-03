const router = require("express").Router();

const categories = [
  { name: "수업", href: "#" },
  { name: "수료자 후기", href: "#" },
];

router.get("/", (req, res) => {
  res.render("root", {
    title: "게시판",
    header: {
      categories,
    },
    container: "board/list",
  });
});

router.get("/write", (req, res) => {
  res.render("root", {
    title: "게시판",
    header: {
      categories,
    },
    container: "board/write",
  });
});
// 원리는 단순하다. 서버에서 client로 html을 보내주고 정보를 보내주면 클라이언트에서 js를 수정하는
// 방식이 아니라, 서버에서 애초에 html을 만들어서 보내준다. 그러니까 이런 방식은
// path에 구애받지 않는다.(path와 달라 정보를 못받아서 페이지를 수정 못하는 경우)
module.exports = router;
