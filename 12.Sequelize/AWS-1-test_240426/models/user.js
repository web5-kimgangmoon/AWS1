const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static init() {
      return super.init(
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          userId: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
          },
          pw: {
            type: DataTypes.STRING(64),
            allowNull: false,
          },
          nick: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
          },
        },
        {
          sequelize,
          modelName: "User",
          tableName: "user",
          timestamps: true,
          paranoid: true,
          underscored: true,
        }
      );
    }
    static associate(db) {
      db.User.hasMany(db.Board, {
        foreignKey: "userId",
        sourceKey: "id",
      });
      db.User.hasMany(db.Recomment, {
        foreignKey: "userId",
        sourceKey: "id",
      });
    }
  }
  return User.init();
};
