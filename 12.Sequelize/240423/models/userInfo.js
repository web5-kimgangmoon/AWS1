const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    static init() {
      return super.init(
        {
          name: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          nick: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "무명",
          },
          age: {
            type: DataTypes.INTEGER,
          },
          address: {
            type: DataTypes.STRING(10),
          },
          gender: {
            type: DataTypes.ENUM(["M", "F"]),
            defaultValue: "M",
          },
        },
        {
          sequelize,
          modelName: "UserInfo",
          tableName: "user_info",
          paranoid: true,
          underscored: true,
        }
      );
    }
    static associate(db) {
      db.UserInfo.belongsTo(db.UserCrypto, {
        foreignKey: "id",
        targetKey: "id",
      });
    }
  }
  return UserInfo.init();
};
