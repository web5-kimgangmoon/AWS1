const router = require("express").Router();
const {
  makeListNCategory,
  makeCategory,
  findBoard,
  insertRecomment,
  insertBoard,
  // makeHeader,
} = require("./../lib");
const { header } = require("./../data/initialData");

// 실행순서 문제 떄문에 테이블로 빼둘 순 없다. 밖에다 뺴둘경우
// 세팅이 먼저 되는 과정에서 header가 만들어져야 하는데, 그러면 테이블이
// 만들어지지 않았으므로 에러가 발생한다. 그렇다고 일일히 만들자니
// 오히려 더 손해다. 아쉽지만 염두에만 두는 편이 좋겠다.

// let header = {};
// (async () => {
//   header = await makeHeader();
//   header.topList[0].class = "main";
// })();

router.get("/write", (req, res) => {
  res.render("write");
});

router.get("/", async (req, res) => {
  const { category, list } = await makeListNCategory();
  const body = {
    menu: { category },
    top: { category },
    list: { list },
    item: undefined,
  };
  res.render("index", {
    title: "전체 게시판",
    header,
    body,
  });
});

router.get("/:cate", async (req, res) => {
  const { category, list, boardName } = await makeListNCategory(
    req.params.cate
  );
  const body = {
    menu: { category },
    top: { category },
    list: { list },
    item: undefined,
  };
  res.render("index", {
    title: boardName + "게시판",
    header,
    body,
  });
});

router.get("/:cate/:id", async (req, res) => {
  const { category, boardName } = await makeCategory(req.params.cate);
  const item = await findBoard(req.params.id);
  const body = {
    menu: { category },
    top: undefined,
    list: undefined,
    item,
  };
  res.render("index", {
    title: boardName + "게시판",
    header,
    body,
  });
});

router.post("/:cate/:id/recomment/:like", async (req, res) => {
  await insertRecomment(req.params.like, req.cookies.userId, req.params.id);

  res.redirect(`/${req.params.cate}/${req.params.id}`);
});

router.post("/write", async (req, res) => {
  await insertBoard(req.body.title, req.body.content, "자유", req.cookies.nick);
  res.redirect("/");
});

module.exports = router;
