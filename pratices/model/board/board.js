import { Model, DataTypes } from "sequelize";

export default class Board extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.String(30),
        },
        content: {
          type: DataTypes.TEXT,
        },
        looks: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "Board",
        tableName: "board",
        underscored: true,
        timestamps: true,
        paranoid: true,
      }
    );
  }
  static associate({ Category, Board, User }) {
    Board.belongsTo(Category, {
      foreignKey: "CategoryId",
      targetKey: "id",
    });
    Board.belongsTo(User, {
      foreignKey: "UserId",
      targetKey: "id",
    });
  }
}
