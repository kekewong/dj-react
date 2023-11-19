import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
} from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./src/routes/UserRoute";
import authRouter from "./src/routes/AuthRoute";
import { expressjwt, Request as JWTRequest } from "express-jwt";

dotenv.config();

const privateKey = process.env.LEARN_REACT_JWT_PRIVATE_KEY || "";
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));

//The default behavior of the module is to extract the JWT from the Authorization header as an Bearer Token
app.use(
  expressjwt({
    secret: privateKey,
    algorithms: ["HS256"],
  }).unless({ path: ["/api/login"] })
);
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token ");
  } else {
    next(err);
  }
});

app.use("/api/users", userRouter);
app.use("/api/login", authRouter);

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
