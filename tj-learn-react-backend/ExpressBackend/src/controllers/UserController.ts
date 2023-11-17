import { Op } from "sequelize";
import { User } from "../models/User";
import asyncHandler from "express-async-handler";
import { connection } from "../utils/Database";
import * as crypto from "crypto";
import "dotenv/config";

const sequelize = connection;

export const getUserList = asyncHandler(async (req, res, next) => {
  let users: User[] = [];
  let where: any = {};
  if (req.query.username) {
    where["username"] = { [Op.like]: "%" + req.query.username + "%" };
  }

  users = await User.findAll({ where });

  let ret: UserDto[] = [];

  users.map((x) => {
    ret.push({
      id: x.id,
      name: x.name,
      username: x.username,
      createDate: x.create_date,
      isActive: x.is_active,
      phoneNo: x.phone_no,
    });
  });

  res.send(ret);
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    res.send(null);
  } else {
    let ret: UserDto = {
      id: user.id,
      name: user.name,
      username: user.username,
      createDate: user.create_date,
      isActive: user.is_active,
      phoneNo: user.phone_no,
    };

    res.send(ret);
  }
});

export const createUser = asyncHandler(async (req, res, next) => {
  const body = req.body as CreateUserDto;
  const salt = process.env.LEARN_REACT_PASSWORD_SALT || "";

  const result = await sequelize.transaction(async (t) => {
    const hashPassword = crypto
      .createHash("sha256")
      .update(body.password)
      .update(crypto.createHash("sha256").update(salt, "utf8").digest("hex"))
      .digest("hex");
    const user = await User.create(
      {
        name: body.name,
        username: body.username,
        password: hashPassword,
        is_active: body.isActive,
        create_date: new Date(),
        phone_no: body.phoneNo,
      },
      { transaction: t }
    );

    return user;
  });
  res.send();
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const body = req.body as UpdateUserDto;
  const salt = process.env.LEARN_REACT_PASSWORD_SALT || "";

  const result = await sequelize.transaction(async (t) => {
    const hashPassword = crypto
      .createHash("sha256")
      .update(body.password)
      .update(crypto.createHash("sha256").update(salt, "utf8").digest("hex"))
      .digest("hex");
    const user = await User.update(
      {
        name: body.name,
        password: hashPassword,
        is_active: body.isActive,
        create_date: new Date(),
        phone_no: body.phoneNo,
      },
      { where: { id: body.id }, transaction: t }
    );

    return user;
  });
  res.send();
});

interface UserDto {
  id: number;
  name: string;
  username: string;
  phoneNo: string;
  createDate: Date;
  isActive: boolean;
}
interface CreateUserDto {
  name: string | undefined;
  username: string | undefined;
  phoneNo: string | undefined;
  isActive: boolean;
  password: string;
}

interface UpdateUserDto {
  id: number;
  name: string | undefined;
  phoneNo: string | undefined;
  isActive: boolean;
  password: string;
}
