import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createProjectController, deleteProjectController, getProjectsByUserController, updateProjectController } from "../controllers/projects.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { createProjectSchema, inviteToProjectSchema } from "../schemas/projects.schemas";
import { authorizeParticipant, authorizeParticipantByRole } from "../middlewares/projects.middlewares";
import { Role } from "../enums/Role";
import { acceptProjectInvitationController, deleteParticipantController, getParticipantsByProjectController, inviteToProjectController, updateParticipantController } from "../controllers/participants.controllers";
import { passOne } from "../middlewares/utility.middlewares";
import { authorizeOwnUser } from "../middlewares/users.middlewares";

const projectRouter = Router();

projectRouter.use(authenticate)

projectRouter.post("", validateBody(createProjectSchema), createProjectController);
projectRouter.patch("/:projectId", authorizeParticipantByRole(Role.EDITOR), updateProjectController)
projectRouter.delete("/:projectId", authorizeParticipantByRole(Role.OWNER), deleteProjectController)

projectRouter.get("/users/:userId", getProjectsByUserController);

projectRouter.post("/:projectId/participants/:email", authorizeParticipantByRole(Role.OWNER), validateBody(inviteToProjectSchema), inviteToProjectController);
projectRouter.post("/:projectId/participants", acceptProjectInvitationController);
projectRouter.get("/:projectId/participants", authorizeParticipant, getParticipantsByProjectController);
projectRouter.patch("/:projectId/participants/:userId", authorizeParticipantByRole(Role.OWNER), updateParticipantController)
projectRouter.delete("/:projectId/participants/:userId", passOne(authorizeParticipantByRole(Role.OWNER), authorizeOwnUser), deleteParticipantController)

export default projectRouter;
