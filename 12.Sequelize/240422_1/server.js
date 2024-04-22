// Sequelize : DB를 연결할 때 유용하게 사용할 수 있는 라이브러리다.
// - squelize와 함께 쓰는 mysql은 mysql2다.
require("dotenv").config();
const { sequelize, Sequelize, User, Board } = require("./models");

// sequelize.sync().then(() => {
//   console.log("access db");
// });

(async () => {
  //
  await sequelize.sync({ force: true });
  console.log("access db");
  for (let i = 0; i < 10; i++) {
    await User.create({
      userId: "test" + i,
      name: "test" + i,
      password: "test",
    });
  }

  //   const list = await User.findAndCountAll({
  //     where: { name: { [Sequelize.Op.like]: "%test1%" } },
  //     limit: 3, // 최대 3개를 가져온다
  //     offset: 3, // 가져온 리스트의 3번째부터 가져온다.(offset 적용 후, limit 적용)
  //   });
  //   //findAll
  //   //findOne
  //   console.log(list.rows[0].name);
  //   console.log(list.rows[2].name);
  //   console.log(list.rows[3]);
  //   console.log(list.count);
})();
