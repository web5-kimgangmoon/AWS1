const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(50),
          allownull: false,
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
      foreignkey: "usersId",
      onDelete: "CASCADE",
    });
    db.Board.belongsTo(db.User, {}); // 1 대 다 관계는 hasMany, belongsTo로 표시
    // 1대 1 관계는 hasOne 관계로 표시
    // 관계를 맺을 때 쓰는 필드를 지정하고 싶으면 객체 사용
  }
};
