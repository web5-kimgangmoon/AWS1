const router = require("express").Router();
const { Todo, Sequelize } = require("../../models");
// router.get("/:id", (req, res) => {
//   console.log(req.params.id);
//   //   console.log(req.cookies?.user);
//   res.data = { ...res.data, user: req.cookies.user, regist: req.query.regist };
//   res.render("index", res.data);
// });

router.use((req, res, next) => {
  res.data = { user: null, regist: false, list: [] };
  next();
});

router.get("/", async (req, res) => {
  res.data.user = req.cookies.user;
  if (req.cookies.userId) {
    res.data.list = await Todo.findAll({
      attributes: [
        "content",
        "id",
        [Sequelize.fn("count", "Todos.id"), "todoCount"],
        // [Sequelize.fn("count", "Todos2.id"), "endCnt"],
      ],
      where: {
        todoId: null,
      },
      include: [
        {
          model: Todo,
          attributes: [],
          // where:
        },
      ],
      group: [Sequelize.col("Todo.id")],
      raw: true, //toJSON
    });
  }
  //   console.log(JSON.parse(JSON.stringify(res.data.list)));
  //   console.log(req.params.id);
  //   console.log(req.cookies?.user);
  //   res.data["user"] = req.cookies.user;
  res.render("index", res.data);
});

router.get("/regist", (req, res) => {
  res.data.regist = true;
  res.render("index", res.data);
});

module.exports = router;
