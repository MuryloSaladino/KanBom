import { Router } from "express";
import { loginController } from "../controllers/login.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { loginSchema } from "../schemas/login.schemas";

const loginRouter = Router();

loginRouter.post("", validateBody(loginSchema), loginController);

export default loginRouter;
