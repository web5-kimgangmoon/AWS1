import { Sequelize, Dialect } from "sequelize";
import SQLconfig from "../config/config.json" assert { type: "json" };

export { Sequelize };

interface IConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}
const env = process.env.NODE_ENV ? "production" : "develop";
let dialect: Dialect = "mysql";

const config: IConfig = { ...SQLconfig[env], dialect };

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export { sequelize };

const db = { sequelize, Sequelize };

export default db;
