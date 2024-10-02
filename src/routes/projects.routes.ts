import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createProjectController, deleteProjectController, getProjectsByUserController, updateProjectController } from "../controllers/projects.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { createProjectSchema, inviteToProjectSchema } from "../schemas/projects.schemas";
import { authorizeParticipant, authorizeParticipantByRole } from "../middlewares/projects.middlewares";
import { Role } from "../enums/Role";
import { acceptProjectInvitationController, getParticipantsByProjectController, inviteToProjectController } from "../controllers/participants.controllers";

const projectRouter = Router();

projectRouter.use(authenticate)

projectRouter.post("", validateBody(createProjectSchema), createProjectController);
projectRouter.patch("/:projectId", authorizeParticipantByRole(Role.EDITOR), updateProjectController)
projectRouter.delete("/:projectId", authorizeParticipantByRole(Role.OWNER), deleteProjectController)

projectRouter.get("/users/:userId", getProjectsByUserController);

projectRouter.post("/:projectId/participants/:email", authorizeParticipantByRole(Role.OWNER), validateBody(inviteToProjectSchema), inviteToProjectController);
projectRouter.post("/:projectId/participants", acceptProjectInvitationController);
projectRouter.get("/:projectId/participants", authorizeParticipant, getParticipantsByProjectController);

export default projectRouter;
