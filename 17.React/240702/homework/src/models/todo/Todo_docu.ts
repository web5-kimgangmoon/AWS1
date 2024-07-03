import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
  Optional,
  BelongsTo,
  HasOne,
  Association,
} from "sequelize";
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

// export interface TodoInput extends Optional<ITodoModel, "isComplete"> {}
// export interface TodoOutput extends Required<ITodoModel> {}

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  id!: CreationOptional<number>;
  content!: string;
  isComplete!: CreationOptional<boolean>;

  readonly createdAt!: CreationOptional<Date>;
  readonly updatedAt!: CreationOptional<Date>;
  readonly deletedAt!: CreationOptional<Date | null>;
  //   declare projects?: NonAttribute<Project[]>;
  //   declare static associations: {
  //     projects: Association<User, Project>;
  //   };
}

// class Project extends Model<
//   InferAttributes<Project>,
//   InferCreationAttributes<Project>
// > {
//   // id can be undefined during creation when using `autoIncrement`
//   declare id: CreationOptional<number>;

//   // foreign keys are automatically added by associations methods (like Project.belongsTo)
//   // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
//   // display an error if ownerId is missing.
//   declare ownerId: ForeignKey<User["id"]>;
//   declare name: string;

//   // `owner` is an eagerly-loaded association.
//   // We tag it as `NonAttribute`
//   declare owner?: NonAttribute<User>;

//   // createdAt can be undefined during creation
//   declare createdAt: CreationOptional<Date>;
//   // updatedAt can be undefined during creation
//   declare updatedAt: CreationOptional<Date>;
// }

// class Address extends Model<
//   InferAttributes<Address>,
//   InferCreationAttributes<Address>
// > {
//   declare userId: ForeignKey<User["id"]>;
//   declare address: string;

//   // createdAt can be undefined during creation
//   declare createdAt: CreationOptional<Date>;
//   // updatedAt can be undefined during creation
//   declare updatedAt: CreationOptional<Date>;
// }

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: { type: DataTypes.DATE, allowNull: true },
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
