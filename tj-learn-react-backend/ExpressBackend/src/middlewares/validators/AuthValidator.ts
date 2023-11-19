import { body } from "express-validator";
import { User } from "../../models/User";
import * as crypto from "crypto";
import "dotenv/config";
import { LoginUserDto } from "../../controllers/AuthController";
const salt = process.env.LEARN_REACT_PASSWORD_SALT || "";

export const loginValidator = [
  body("username", "Username cannot be empty").not().isEmpty(),
  body("password", "Password cannot be empty")
    .not()
    .isEmpty()
    .custom(async (value, { req }) => {
      const data = req.body as LoginUserDto;
      const hashPassword = crypto
        .createHash("sha256")
        .update(value)
        .update(crypto.createHash("sha256").update(salt, "utf8").digest("hex"))
        .digest("hex");

      const existingUser = await User.findOne({
        where: { username: data.username, password: hashPassword },
      });
      if (!existingUser) {
        throw new Error("Invalid username & password");
      }
    }),
];
