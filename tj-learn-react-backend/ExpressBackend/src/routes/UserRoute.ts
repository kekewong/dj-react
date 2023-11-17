import express, { Express, Request, Response, Application } from "express";
import { getUser, getUserList } from "../controllers/UserController";

const router = express.Router();

router.get("/", getUserList);
router.get("/:id", getUser);

export default router;
