const Sequelize = require("sequelize");
// const user_difine = require("./user_define");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // column, field
        userId: {
          field: "userid", // column 명을 지정할 수 있다.
          type: Sequelize.STRING(50),
          allowNull: false, // default: true
          unique: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(10),
          allowNull: false, //default : true
          //unique: true
        },
        password: {
          type: Sequelize.STRING(64),
          allowNull: false, //default : true
        },
        age: {
          type: Sequelize.TINYINT.UNSIGNED,
        },
      },
      {
        sequelize,
        modelName: "User", // Sequelize가 이해하는 Table 이름(모델명)
        tableName: "user", // DB에서의 Table 이름
        underscored: true, // 필드를 대문자에서 소문자로 만들어준다.
        //   createdAt: false, // default: true
        //   updatedAt: false, // default: true
        //소문자로 만들어준다.
        paranoid: true, // 삭제 시 완전 삭제가 아닌 deleted_at을 통해서 확인한다.
      }
    );
  }

  static associate(db) {
    // 같은 것이 있을 수 없다.
    db.User.hasMany(db.Board, {
      targetKey: "userId",
      foreignkey: { name: "userId" },
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.Board, {}); // 1대 다 관계
    // db.User.hasOne(db.Board); // 1대 1 관계
    // N : M
    db.User.belongsToMany(db.User, {
      through: "follow",
      foreignkey: "followerId", // column 명
      as: "follower", // sequelize가 사용하는 별명
      //   sourceKey:"userId",
    });
    db.User.belongsToMany(db.User, {
      through: "block",
      foreignkey: "followingId", // column 명
      as: "following", // sequelize가 사용하는 별명
      //   sourceKey:"userId"
    });
  }
};
