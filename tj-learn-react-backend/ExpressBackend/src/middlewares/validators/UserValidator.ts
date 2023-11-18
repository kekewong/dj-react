import { body } from "express-validator";
import { User } from "../../models/User";

export const createUserValidator = [
  body("username", "Username does not empty")
    .not()
    .isEmpty()
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { username: value } });
      if (existingUser) {
        // Will use the below as the error message
        throw new Error("A user already exists with this username");
      }
    }),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];
