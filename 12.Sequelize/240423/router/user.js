const router = require("express").Router();
const { UserCrypto, UserInfo, sequelize, Sequelize } = require("../models");

// localhost:8080/api/user/test POST
router.post("/test", async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = "test1",
      pw = "qwer",
      phone = "123-4567-1234",
      name = "방지완";
    //   nick = "무념무상";
    await UserCrypto.create({ userId, pw, phone }, { transaction });
    // await UserInfo.create({ name, nick: null }, { transaction });
    await transaction.commit();
  } catch (err) {
    console.error(err);
    await transaction.rollback();
  }
  res.send("ok");
});

router.post("/test2", async (req, res) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const tempArr = [
        {
          userId: "test1",
          pw: "qwer",
          phone: "123-4567-1234",
          name: "김강문",
          nick: "아무거나",
          age: 26,
          address: "서울시",
        },
        {
          userId: "test2",
          pw: "qwer",
          phone: "123-4567-1234",
          name: "박성민",
          nick: "캐럿",
          age: 34,
          address: "서울시",
        },
        {
          userId: "test3",
          pw: "qwer",
          phone: "123-4567-1234",
          name: "방지완",
          nick: "곰",
          age: 27,
          address: "서울시",
        },
        {
          userId: "test4",
          pw: "qwer",
          phone: "123-4567-1234",
          name: "손민복",
          nick: "민복손",
          age: 27,
          address: "고양시",
        },
        {
          userId: "test5",
          pw: "qwer",
          phone: "123-4567-1234",
          name: "이동찬",
          nick: "사과",
          age: 29,
          address: "남양주시",
        },
        {
          userId: "test6",
          pw: "qwer",
          phone: "123-4567-1234",
          name: "이승배",
          nick: "무념무상",
          age: 25,
          address: "안양시",
        },
        {
          userId: "test7",
          pw: "qwer",
          phone: "123-4567-1234",
          name: "이정배",
          nick: "햄스터",
          age: 23,
          address: "안양시",
        },
      ];
      for (const { userId, pw, phone, name, nick, age, address } of tempArr) {
        await UserCrypto.create({ userId, pw, phone }, { transaction });
        await UserInfo.create(
          { name, nick, age, address, gender: "M" },
          { transaction }
        );
      }
    });

    //   await transaction.commit();
  } catch (err) {
    console.error(err);
    //   await transaction.rollback();
  }
  res.send("ok");
});

router.get("/info", async (req, res) => {
  // SELECT uc.id, uc.user_Id, uc.pw, uc.phone, ui.name, ui.nick, ui.age, ui.address
  // FROM user_crypto AS uc
  // INNER JOIN user_info AS ui ON uc.id=ui.id;
  // res.send(
  //   await UserInfo.findAll({
  //     where: { address: "서울시" },
  //   })
  // );
  // res.send(
  //   await UserInfo.findAll({
  //     attributes: [[sequelize.fn("avg", Sequelize.col("age")), "avg_age"]],
  //   })
  // );
  // res.send(
  //   await UserInfo.findAll({
  //     attributes: [[sequelize.fn("count", Sequelize.col("age")), "count_age"]],
  //   })
  // );
  // res.send(
  //   await UserInfo.findAll({
  //     attributes: [
  //       "address",
  //       [sequelize.fn("count", sequelize.col("address")), "cnt"],
  //     ],
  //     group: ["address"],
  //   })
  // );
  // res.send(
  //   await UserInfo.findAll({
  //     attributes: ["address", [sequelize.fn("count", "id"), "cnt"]],
  //     group: ["address"],
  //     order: [["cnt", "desc"]],
  //   })
  // );
  // res.send(
  //   await UserInfo.findAll({
  //     attributes: ["address", [sequelize.fn("count", "id"), "cnt"]],
  //     group: ["address"],
  //     order: [["cnt", "desc"]],
  //     having: { cnt: 1 },
  //   })
  // );
  // res.send(
  //   await UserInfo.findAll({
  //     attributes: ["address", [sequelize.fn("count", "id"), "cnt"]],
  //     group: ["address"],
  //     order: [["cnt", "desc"]],
  //     // having: {
  //     //   [Sequelize.Op.and]: [
  //     //     { cnt: { [Sequelize.Op.lte]: 1 } },
  //     //     { cnt: { [Sequelize.Op.gt]: 2 } },
  //     //   ],
  //     // },
  //     having: { cnt: { [Sequelize.Op.ne]: 1 } },

  //     gt grater than
  //     lt less than
  //     ne not equal
  //     e equal
  //   })
  // );
  // res.send(
  //   await UserInfo.findAll({
  //     attributes: ["name", "age"],
  //     where: { name: { [Sequelize.Op.like]: "이%" } }, // LIKE "이%"
  //   })
  // );
  // res.send(
  //   await UserInfo.findAll({
  //     attributes: ["name", "age"],
  //     where: { name: { [Sequelize.Op.startWith]: "이" } }, // LIKE "이%"
  //   })
  // );
  // res.send(
  //   await UserCrypto.findAll({
  //     attributes: ["id", "user_id", "pw", "phone"],
  //     include: [
  //       {
  //         model: UserInfo,
  //         attributes: ["name", "nick", "age", "address"],
  //       },
  //     ],
  //     order: [[UserInfo, "age", "desc"]], // ORDER BY ui.age;
  //     limit: 2,
  //     offset: 0,
  //   })
  // );
  res.send(
    await UserCrypto.findAll({
      attributes: [
        [sequelize.col("UserInfo.address"), "address"],
        // [sequelize.fn("count", "id"), "address_cnt"],
        // [sequelize.fn("count", "*"), "address2_cnt"],
      ],
      include: [
        {
          model: UserInfo,
          attributes: [],
          where: {
            address: "서울시",
          },
        },
        {
          include: [
            {
              model: UserInfo,
              attributes: ["id"],
            },
          ],
        },
        // include 안에 include를 포함할 수 있지만, 내부적으로 subQuery를 돌리기 때문에 좋은 방법은 아니다.
      ],
      // order: [[UserInfo, "age", "desc"]], // ORDER BY ui.age;
      // limit: 2,
      // offset: 2,
      group: ["address"],
    })
  );
  // res.send(
  //   await User
  // )
});

router.get("/test", async (req, res) => {
  //   await res.send([
  //     ...(await UserCrypto.findAll()),
  //     ...(await UserInfo.findAll()),
  //   ]);
  res.send(
    await UserCrypto.findAll({
      where: {},
      attributes: ["userId", "phone"],
      include: [
        {
          model: UserInfo,
          attributes: ["name", "nick"],
        },
      ],
    })
  );
});

module.exports = router;
