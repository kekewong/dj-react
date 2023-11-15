import { Sequelize, DataTypes, Model } from "sequelize";

const dbName = process.env.MYSQL_DB_NAME || "";
const dbUsername = process.env.MYSQL_DB_USERNAME || "";
const dbPassword = process.env.MYSQL_DB_PASSWORD || "";
const dbHost = process.env.MYSQL_DB_HOST || "";

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

class User extends Model {
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
  { sequelize }
);

export default User;
