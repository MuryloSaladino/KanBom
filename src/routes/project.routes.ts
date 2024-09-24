import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createProjectController } from "../controllers/projects.controller";

const projectRouter = Router();

projectRouter.post("", authenticate, createProjectController);

export default projectRouter;