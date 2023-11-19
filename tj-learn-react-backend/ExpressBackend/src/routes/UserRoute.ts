import express, { Express, Request, Response, Application } from "express";
import {
  createUser,
  getUser,
  getUserList,
  updateUser,
} from "../controllers/UserController";
import { createUserValidator } from "../middlewares/validators/UserValidator";
import { validate } from "../middlewares/validators/BaseValidator";
import { expressjwt } from "express-jwt";

const privateKey = process.env.LEARN_REACT_JWT_PRIVATE_KEY || "";
const router = express.Router();

router.get("/", getUserList);
router.get("/:id", getUser);
router.post("/", validate(createUserValidator), createUser);
router.put("/", updateUser);

export default router;
