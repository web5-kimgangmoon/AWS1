const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Recomment extends Model {
    static init() {
      return super.init(
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          recomment: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
            allowNull: false,
          },
          userId: {
            type: DataTypes.INTEGER.UNSIGNED,
          },
          boardId: {
            type: DataTypes.INTEGER.UNSIGNED,
          },
        },
        {
          sequelize,
          modelName: "Recomment",
          talbeName: "recomment",
          timestamps: false,
          paranoid: false,
          underscored: true,
        }
      );
    }
    static associate(db) {
      db.Recomment.belongsTo(db.Board, {
        foreignKey: "boardId",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      db.Recomment.belongsTo(db.User, {
        foreignKey: "userId",
        targetKey: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }
  return Recomment.init();
};
