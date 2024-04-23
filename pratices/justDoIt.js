module.exports = class Board extends require("sequelize").Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Board",
        tableName: "board",
        underscored: true,
      }
    );
  }

  static associate(db) {
    db.Board.belongsTo(db.User, {
      sourceKey: "userId",
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    db.Board.belongsTo(db.User, {
      sourceKey: "userId",
      foreignKey: "userId",
      onDelete: "CASCADE",
    }); // 1 대 다 관계는 hasMany, belongsTo로 표시
    // 1대 1 관계는 hasOne 관계로 표시
    // 관계를 맺을 때 쓰는 필드를 지정하고 싶으면 객체 사용
  }
};

const Sequelize = require("sequelize");
const config = require("../config/conifg.json")["development"];
// const config = require("./config.json");
// 데이터 베이스명
// 유저 이름
// 패스워드
const sequelize = new Sequelize(database, username, userpassword, {
  database,
  username,
  userpassword,
  host,
  port,
  // dialect mysql
});

const User = require("./user").init(sequelize);
const Board = require("./board").init(sequelize);

const db = { User, Board };

User.associate(db);
Board.associate(db);

module.exports = { sequelize, Sequelize, User, Board };
