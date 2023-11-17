import { Op } from "sequelize";
import { User } from "../models/User";
import asyncHandler from "express-async-handler";

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
    };

    res.send(ret);
  }
});

interface UserDto {
  id: number;
  name: string;
  username: string;
  createDate: Date;
  isActive: boolean;
}
