const recomment = require("../models/recomment");
const db = require("./../models");

const makeListNCategory = async () => {
  try {
    const list = [],
      category = [],
      recomment = [];
    const selectBoard = await db.Board.findAll({
      include: [
        {
          model: db.Category,
        },
        {
          model: db.User,
          attributes: ["nick"],
        },
      ],
      order: [["id", "desc"]],
    });
    const selectCategory = await db.Category.findAll({});
    const selectRecomment = await db.Recomment.findAll({
      attributes: [
        "boardId",
        [db.Sequelize.fn("sum", db.sequelize.col("recomment")), "reco"],
      ],
      group: ["boardId"],
    });
    console.log(selectRecomment);
    for (const item of selectRecomment) {
      recomment.push({ boardId: item.boardId, reco: item.get("reco") });
    }
    console.log(recomment);
    for (let item of selectBoard) {
      list.push({
        id: item.id,
        user_nick: item.User.nick,
        title: item.title,
        category: {
          href: item.Category.href,
          name: item.Category.name,
        },
        created_at: item.createdAt,
        content: item.content,
      });
    }
    for (let item of list) {
      const findRecomment = recomment.find(({ boardId }) => boardId == item.id);
      item.recomment = findRecomment ? findRecomment.reco : 0;
    }
    for (const { href, name } of selectCategory) {
      category.push({ href, name });
    }
    return { category, list };
  } catch (err) {
    console.error(err);
  }
};

const makeCategory = async () => {
  try {
    const category = [];
    const selectCategory = await db.Category.findAll({});
    for (const { href, name } of selectCategory) {
      category.push({ href, name });
    }
    return category;
  } catch (err) {
    console.error(err);
  }
};

const findBoard = async (id) => {
  try {
    const selectBoard = await db.Board.findOne({
      include: [
        {
          model: db.Category,
        },
        {
          model: db.User,
          attributes: ["nick"],
        },
      ],
      where: { id: id },
    });
    const selectRecomment = await db.Recomment.findOne({
      attributes: [
        [db.Sequelize.fn("sum", db.sequelize.col("recomment")), "reco"],
      ],
      where: { boardId: id },
    });

    const list = {
      id: selectBoard.id,
      user_nick: selectBoard.User.nick,
      title: selectBoard.title,
      category: {
        href: selectBoard.Category.href,
        name: selectBoard.Category.name,
      },
      created_at: selectBoard.createdAt,
      content: selectBoard.content,
      recomment: selectRecomment.get("reco") ? selectRecomment.get("reco") : 0,
    };
    return list;
  } catch (err) {
    console.error(err);
  }
};

const makeUsers = async () => {
  try {
    const selectAll = await db.User.findAll({});
    return { userId: selectAll.userId, pw: selectAll.pw, nick: selectAll.nick };
  } catch (err) {
    console.error(err);
  }
};

const insertUsers = async (userId, pw, nick) => {
  try {
    await db.User.create({ userId, pw, nick });
  } catch (err) {
    console.error(err);
  }
};

const selectUsers = async (userId, pw) => {
  try {
    const select = await db.User.findOne({
      where: {
        userId: userId,
        pw: pw,
      },
    });
    return { userId: select.userId, pw: select.pw, nick: select.nick };
  } catch (err) {
    console.error(err);
  }
};

const insertRecomment = async (recomment, userId, boardId) => {
  try {
    if (!userId) return;
    await db.Recomment.create({ recomment, userId, boardId });
  } catch (err) {
    console.error(err);
  }
};

const insertBoard = async (title, content, categoryName, userNick) => {
  try {
    if (!userNick) return;
    const findCaId = await db.Category.findOne({
      attributes: ["id"],
      where: { name: categoryName },
    });
    const findUsId = await db.User.findOne({
      attributes: ["id"],
      where: { nick: userNick },
    });
    await db.Board.create({
      title,
      content,
      categoryId: findCaId.id,
      userId: findUsId.id,
    });
  } catch (err) {
    console.error(err);
  }
};

// const makeHeader = async () => {
//   try {
//     const selectTopList = await db.TopList.findAll({
//       order: [["id", "desc"]],
//     });
//     const selectSubList = await db.SubList.findAll({
//       order: [["id", "desc"]],
//     });
//     const topList = [];
//     const subList = [];
//     for (const { img, name } of selectTopList) {
//       topList.push({ img, name });
//     }
//     for (const { name } of selectSubList) {
//       subList.push({ name });
//     }
//     return { topList, subList };
//   } catch (err) {
//     console.error(err);
//   }
// };
module.exports = {
  makeListNCategory,
  makeCategory,
  findBoard,
  insertRecomment,
  insertBoard,
  makeUsers,
  selectUsers,
  insertUsers,
  makeHeader,
};
