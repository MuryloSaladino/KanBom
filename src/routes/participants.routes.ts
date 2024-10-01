import { Router } from "express";
import { Role } from "../enums/Role";
import authenticate from "../middlewares/authenticate.middleware";
import { authorizeParticipantByRole } from "../middlewares/projects.middlewares";
import { acceptProjectInvitationController, inviteToProjectController } from "../controllers/participants.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { inviteToProjectSchema } from "../schemas/projects.schemas";

const participantsRouter = Router();

participantsRouter.use(authenticate);

participantsRouter.post("/projects/:projectId/users/:email", 
    authorizeParticipantByRole(Role.OWNER), validateBody(inviteToProjectSchema), inviteToProjectController);
participantsRouter.post("/invites/:projectId", acceptProjectInvitationController)

export default participantsRouter;