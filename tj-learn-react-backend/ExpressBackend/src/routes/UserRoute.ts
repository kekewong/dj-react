import express, { Express, Request, Response, Application } from "express";
import {
  createUser,
  getUser,
  getUserList,
} from "../controllers/UserController";

const router = express.Router();

router.get("/", getUserList);
router.get("/:id", getUser);
router.post("/", createUser);

export default router;
