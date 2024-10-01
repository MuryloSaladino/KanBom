import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createProjectController, deleteProjectController, getProjectsByUserController, updateProjectController } from "../controllers/projects.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { createProjectSchema } from "../schemas/projects.schemas";
import { authorizeParticipantByRole } from "../middlewares/projects.middlewares";
import { Role } from "../enums/Role";

const projectRouter = Router();

projectRouter.use(authenticate)

projectRouter.post("", validateBody(createProjectSchema), createProjectController);
projectRouter.get("/users/:userId", getProjectsByUserController);
projectRouter.patch("/:projectId", authorizeParticipantByRole(Role.EDITOR), updateProjectController)
projectRouter.delete("/:projectId", authorizeParticipantByRole(Role.OWNER), deleteProjectController)

export default projectRouter;
