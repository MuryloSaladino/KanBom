import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createProjectController, deleteProjectController, getProjectsByUserController, updateProjectController } from "../controllers/projects.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { createProjectSchema } from "../schemas/projects.schemas";
import { authorizeParticipantByRole } from "../middlewares/projects.middlewares";
import { Role } from "../enums/Role";

const projectRouter = Router();

projectRouter.post("", authenticate, validateBody(createProjectSchema), createProjectController);
projectRouter.get("/users/:userId", authenticate, getProjectsByUserController);
projectRouter.patch("/:projectId", authenticate, authorizeParticipantByRole(Role.EDITOR), updateProjectController)
projectRouter.delete("/:projectId", authenticate, authorizeParticipantByRole(Role.OWNER), deleteProjectController)

export default projectRouter;
