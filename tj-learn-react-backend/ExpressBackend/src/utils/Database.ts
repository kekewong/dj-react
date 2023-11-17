import { Sequelize } from "sequelize";
import "dotenv/config";

const dbName = process.env.MYSQL_DB_NAME || "";
const dbUsername = process.env.MYSQL_DB_USERNAME || "";
const dbPassword = process.env.MYSQL_DB_PASSWORD || "";
const dbHost = process.env.MYSQL_DB_HOST || "";

export const connection: Sequelize = new Sequelize(
  dbName,
  dbUsername,
  dbPassword,
  {
    host: dbHost,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }
);
