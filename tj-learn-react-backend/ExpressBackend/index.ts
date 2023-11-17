import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./src/routes/UserRoute";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use("/api/users", userRouter);
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
