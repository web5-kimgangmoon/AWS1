import { Sequelize, Dialect } from "sequelize";
import SQLconfig from "../config/config.json";

export { Sequelize };

interface IConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}
const env = process.env.NODE_ENV ? SQLconfig["product"] : SQLconfig["develop"];
let dialect: Dialect = "mysql";

const config: IConfig = { ...env, dialect };

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export { sequelize };

export default sequelize;
