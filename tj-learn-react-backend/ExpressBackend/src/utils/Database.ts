import { Sequelize } from "sequelize";
import "dotenv/config";
import { User } from "../models/User";

const dbName = process.env.LEARN_REACT_MYSQL_DB_NAME || "";
const dbUsername = process.env.LEARN_REACT_MYSQL_DB_USERNAME || "";
const dbPassword = process.env.LEARN_REACT_MYSQL_DB_PASSWORD || "";
const dbHost = process.env.LEARN_REACT_MYSQL_DB_HOST || "";

interface db {
  connection: Sequelize;
}

export const db: db = {
  connection: new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }),
};
