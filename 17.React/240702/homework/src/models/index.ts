import { Sequelize, Dialect, Options } from "sequelize";
import SQLconfig from "../config/config.json";

export { Sequelize };

const env = "develop";
const config: Options = SQLconfig[env] as Options;

const sequelize = new Sequelize(config);

export { sequelize };

export default sequelize;
