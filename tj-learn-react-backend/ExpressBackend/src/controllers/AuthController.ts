import { User } from "../models/User";
import * as crypto from "crypto";
import "dotenv/config";
import { db } from "../utils/Database";
import { sign } from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const sequelize = db.connection;
const salt = process.env.LEARN_REACT_PASSWORD_SALT || "";
const privateKey = process.env.LEARN_REACT_JWT_PRIVATE_KEY || "";
export interface LoginUserDto {
  username: string;
  password: string;
}

export const loginUser = asyncHandler(async (req, res, next) => {
  const body = req.body as LoginUserDto;
  const hashPassword = crypto
    .createHash("sha256")
    .update(body.password)
    .update(crypto.createHash("sha256").update(salt, "utf8").digest("hex"))
    .digest("hex");

  const user = await User.findOne({
    where: { username: body.username, password: hashPassword },
  });

  const token = sign({ _id: user?.id, username: user?.username }, privateKey, {
    expiresIn: 60 * 60 * 24 * 12,
    algorithm: "HS256",
  }); // 1 year expiry

  res.send(token);
});
