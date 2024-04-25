const { Model } = require("sequelize");

module.exports = (sequelize, Datatypes) => {
  class User extends Model {
    static init() {
      return super.init(
        {
          userId: {
            type: Datatypes.STRING(30),
            allowNull: false,
            unique: true,
          },
          pw: {
            type: Datatypes.STRING(64),
            allowNull: false,
          },
          nick: {
            type: Datatypes.STRING(30),
            allowNull: false,
            unique: true,
          },
        },
        {
          sequelize,
          modelName: "User",
          tableName: "todo_user",
          underscored: true,
          timestamps: true,
          paranoid: true,
        }
      );
    }
    static associate(db) {
      db.User.hasMany(db.Todo, { foreignKey: "userId", sourceKey: "id" });
    }
  }
  return User.init();
};
