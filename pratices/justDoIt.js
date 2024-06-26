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


module.exports = class Board extends require("sequelize").Model{
  static init(sequelize){
    return super.init(
      {
        title:{
          type:Sequelize.STRING(50),
          allowNull:false
        },
        content:{
          type:Sequelize.TEXT,
          allowNull:false
        },
      },
      {
        sequelize,
        modelName:"Board",
        tableName:"board",
        underscored:true,
      }
    )
  }

  static associate(db) {
    db.Board.belongsTo(db.User, {
      sourceKey:"userId",
      foreignKey:"userId",
      onDelete:"CASCADE",
    });
    db.Board.belongsTo(db.User, {
      sourceKey:"userId",
      foreingKey:"userId",
      onDelete:"CASCADE"
    }); // 1 대 다 관계는 hasMany, belongsTo로 표시
    // 1 대 1 관계는 hasOne 관계로 표시
    // 관계를 맺을 때 쓰는 필드를 지정하고 싶으면 객체 사용
  }
}

const Sequelize = require("sequelize");
const config = require("../config/config.json")["devlelopment"];
// const config = require("./config.json");
// 데이터 베이스명
// 유저 이름
// 패스워드
const sequelize = new Sequelize(dabase, username, userpassword,{
  database,
  username,
  userpassword,
  host,
  port,
  // dialect mysql
})

const User = 

import Sequelize from "sequelize";
import mySQLConfig from "../config/config.json" assert {type:"json"};

import CategoryModel from "./board/category.js";
import BoardModel from "./board/board.js";
import UserModel from "./user/user.js";

const env = process.env.NODEENV || "dev";

const config = mySQLConfig["dev"];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

export const User = UserModel.init(sequelize);
export const Category = CategoryModel.init(sequelize);
export const Board = BoardModel.init(sequelize);
const db= {Category, Board, User};

Object.keys(db).forEach((model) => {
  db[model].associate(db);
});

db.sequelize = sequelzie;
db.Seqeulize = Sequelize;

export default db;

