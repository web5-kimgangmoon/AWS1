import sequelize, { Sequelize } from ".";
import Todo from "./todo/Todo_docu";

const db = { sequelize, Sequelize, Todo };
export { sequelize, Sequelize, Todo };
export default db;
