const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];
// const config = require("./config.json");
// 데이터 베이스명
// 유저 이름
// 패스워드
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = require("./user").init(sequelize);
const Board = require("./board").init(sequelize);

const db = { User, Board };

User.associate(db);
Board.associate(db);

module.exports = { sequelize, Sequelize, User };
