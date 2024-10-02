import { Router } from "express";
import { Role } from "../enums/Role";
import authenticate from "../middlewares/authenticate.middleware";
import { authorizeParticipant, authorizeParticipantByRole } from "../middlewares/projects.middlewares";
import { acceptProjectInvitationController, getParticipantsByProjectController, inviteToProjectController } from "../controllers/participants.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { inviteToProjectSchema } from "../schemas/projects.schemas";

const participantsRouter = Router();

participantsRouter.use(authenticate);

participantsRouter.post("/projects/:projectId/users/:email", 
    authorizeParticipantByRole(Role.OWNER), validateBody(inviteToProjectSchema), inviteToProjectController);
participantsRouter.post("/invites/:projectId", acceptProjectInvitationController);
participantsRouter.get("/projects/:projectId", authorizeParticipant, getParticipantsByProjectController);

export default participantsRouter;
