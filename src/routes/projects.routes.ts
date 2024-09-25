import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createProjectController, getProjectsByUserController } from "../controllers/projects.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { createProjectSchema } from "../schemas/projects.schemas";

const projectRouter = Router();

projectRouter.post("", authenticate, validateBody(createProjectSchema), createProjectController);
projectRouter.get("/:userId", authenticate, getProjectsByUserController);

export default projectRouter;
