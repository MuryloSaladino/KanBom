import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createProjectController } from "../controllers/projects.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { createProjectSchema } from "../schemas/projects.schemas";

const projectRouter = Router();

projectRouter.post("", authenticate, validateBody(createProjectSchema), createProjectController);

export default projectRouter;
