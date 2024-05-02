import Sequelize from "sequelize";
import mySQLConfig from "../config/config.json" assert { type: "json" };

import CategoryModel from "./board/category.js";
import BoardModel from "./board/board.js";

const env = process.env.NODEENV || "dev";

const config = mySQLConfig["dev"];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export const Category = CategoryModel.init(sequelize);
export const Board = BoardModel.init(sequelize);
const db = { Category, Board };

Object.keys(db).forEach((model) => {
  db[model].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
