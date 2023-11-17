import express, { Express, Request, Response, Application } from "express";
import {
  createUser,
  getUser,
  getUserList,
  updateUser,
} from "../controllers/UserController";

const router = express.Router();

router.get("/", getUserList);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/", updateUser);

export default router;
