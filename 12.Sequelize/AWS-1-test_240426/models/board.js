const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static init() {
      return super.init(
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING(30),
          },
          content: {
            type: DataTypes.TEXT,
          },
          userId: {
            type: DataTypes.INTEGER.UNSIGNED,
          },
          categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
          },
        },
        {
          sequelize,
          modelName: "Board",
          tableName: "board",
          timestamps: true,
          paranoid: true,
          underscored: true,
        }
      );
    }
    static associate(db) {
      db.Board.belongsTo(db.User, {
        through: "",
        foreignKey: "userId",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      db.Board.belongsTo(db.Category, {
        foreignKey: "categoryId",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      db.Board.hasMany(db.Recomment, {
        foreignKey: "boardId",
        sourceKey: "id",
      });
    }
  }
  return Board.init();
};
