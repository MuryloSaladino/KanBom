import { Router } from "express";
import { Role } from "../enums/Role";
import authenticate from "../middlewares/authenticate.middleware";
import { authorizeParticipantByRole } from "../middlewares/projects.middlewares";
import { inviteToProjectController } from "../controllers/participants.controllers";

const participantsRouter = Router();

participantsRouter.use(authenticate);

participantsRouter.post("/:projectId/users/:email", authorizeParticipantByRole(Role.OWNER), inviteToProjectController);

export default participantsRouter;