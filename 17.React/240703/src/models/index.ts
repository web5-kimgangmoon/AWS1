import { Sequelize, Options } from "sequelize";
import SQLConfig from "../config/mysql.json";
import Todo from "./Todo";

const config: Options = SQLConfig.development as Options;

const sequelize = new Sequelize(config);
Todo.initialize(sequelize);
export { Todo, sequelize };
