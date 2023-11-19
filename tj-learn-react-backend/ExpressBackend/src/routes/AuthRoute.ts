import express, { Express, Request, Response, Application } from "express";
import { loginValidator } from "../middlewares/validators/AuthValidator";
import { loginUser } from "../controllers/AuthController";
import { validate } from "../middlewares/validators/BaseValidator";
const router = express.Router();

router.post("/", validate(loginValidator), loginUser);

export default router;
