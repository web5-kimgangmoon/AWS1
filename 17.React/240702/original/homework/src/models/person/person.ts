// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreateOptions,
//   HasManyAddAssociationsMixin,
//   HasManyAddAssociationMixin,
//   HasManySetAssociationsMixin,
//   HasManyGetAssociationsMixin,
//   HasManyRemoveAssociationMixin,
//   HasManyRemoveAssociationsMixin,
//   HasManyHasAssociationsMixin,
//   HasManyHasAssociationMixin,
//   HasManyCountAssociationsMixin,
//   HasManyCreateAssociationMixin,
//   NonAttribute,
//   Association,
// } from "sequelize";
// import Todo from "../todo/Todo";

// class Person extends Model<
//   InferAttributes<Person, { omit: "todos" }>,
//   InferCreationAttributes<Person, { omit: "todos" }>
// > {
//   public id!: CreateOptions<number>;
//   //   ownerId!: ForeignKey<"todos">;
//   public name!: string;
//   public strId!: Required<string>;
//   public password!: Required<string>;

//   public createdAt!: CreateOptions<Date>;
//   public updatedAt!: CreateOptions<Date>;
//   public deletedAt!: CreateOptions<Date | null>;

//   getTodos!: HasManyGetAssociationsMixin<Todo>;
//   addTodo!: HasManyAddAssociationMixin<Todo, number>;
//   addTodos!: HasManyAddAssociationsMixin<Todo, number>;
//   setTodos!: HasManySetAssociationsMixin<Todo, number>;
//   removeTodo!: HasManyRemoveAssociationMixin<Todo, number>;
//   removeTodos!: HasManyRemoveAssociationsMixin<Todo, number>;
//   hasTodo!: HasManyHasAssociationMixin<Todo, number>;
//   hasTodos!: HasManyHasAssociationsMixin<Todo, number>;
//   countTodos!: HasManyCountAssociationsMixin;
//   createTodo!: HasManyCreateAssociationMixin<Todo, "ownerId">;

//   declare todos?: NonAttribute<Todo[]>;

//   declare static associations: {
//     todos: Association<Person, Todo>;
//   };
// }
