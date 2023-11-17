import { Sequelize, DataTypes, Model } from "sequelize";
import "dotenv/config";
import { connection } from "../utils/Database";

const sequelize = connection;

export class User extends Model {
  id: number;
  name: string;
  username: string;
  phone_no: string;
  is_active: boolean;
  create_date: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    create_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, tableName: "user", modelName: "user" }
);
