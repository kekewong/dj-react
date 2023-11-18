import express, { Express, Request, Response, Application } from "express";
import {
  createUser,
  getUser,
  getUserList,
  updateUser,
} from "../controllers/UserController";
import { createUserValidator } from "../middlewares/validators/UserValidator";
import { validate } from "../middlewares/validators/BaseValidator";

const router = express.Router();

router.get("/", getUserList);
router.get("/:id", getUser);
router.post("/", validate(createUserValidator), createUser);
router.put("/", updateUser);

export default router;
