import { DataTypes, Model, Optional, BelongsTo, HasOne } from "sequelize";
import sequelize from "../index";

interface ITodoModel {
  id: number;
  content: string;
  isComplete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
// type todoTyWith = Optional<todoTy, "id">;

export interface TodoInput extends Optional<ITodoModel, "id"> {}
export interface TodoOutput extends Required<ITodoModel> {}

class Todo extends Model<ITodoModel, TodoInput> implements ITodoModel {
  public id!: number;
  public content!: string;
  public isComplete!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Todo",
    tableName: "todo",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Todo;
