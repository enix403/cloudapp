import { green, red } from "colorette";
import { Sequelize } from "sequelize";

import { appEnv } from "@/lib/app-env";
import { appLogger } from "@/lib/logger";

export const sequelize: Sequelize = new Sequelize(appEnv.POSTGRES_URL);
export const db = sequelize;

export async function connectPostgreSQL() {
  try {
    appLogger.verbose("Connecting to PostgreSQL ...");
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    appLogger.verbose(green("Connected successfully to PostgreSQL instance"));
  } catch (error) {
    appLogger.error(red("Connection to PostgreSQL instance failed"));
    throw error;
  }
}
