const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static init() {
      return super.init(
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          href: {
            type: DataTypes.STRING(30),
            unique: true,
          },
          name: {
            type: DataTypes.STRING(30),
            unique: true,
          },
        },
        {
          sequelize,
          modelName: "Category",
          tableName: "category",
          timestamps: false,
          underscored: false,
          paranoid: true,
        }
      );
    }
    static associate(db) {
      db.Category.hasMany(db.Board, {
        foreignKey: "categoryId",
        sourceKey: "id",
      });
    }
  }
  return Category.init();
};
