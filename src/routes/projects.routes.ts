import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createBoardController, deleteBoardController, getBoardsByUserController, updateBoardController } from "../controllers/boards.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { createProjectSchema, inviteToProjectSchema } from "../schemas/projects.schemas";
import { authorizeParticipant, authorizeParticipantByRole } from "../middlewares/projects.middlewares";
import { acceptProjectInvitationController, deleteParticipantController, getParticipantsByProjectController, inviteToProjectController, updateParticipantController } from "../controllers/participants.controllers";
import { passOne } from "../middlewares/utility.middlewares";
import { authorizeOwnUser } from "../middlewares/users.middlewares";

const projectRouter = Router();

projectRouter.use(authenticate)

projectRouter.post("", validateBody(createProjectSchema), createBoardController);
projectRouter.patch("/:projectId", authorizeParticipantByRole(["Editor", "Owner"]), updateBoardController)
projectRouter.delete("/:projectId", authorizeParticipantByRole(["Owner"]), deleteBoardController)

projectRouter.get("/users/:userId", getBoardsByUserController);

projectRouter.post("/:projectId/participants/:email", authorizeParticipantByRole(["Owner"]), validateBody(inviteToProjectSchema), inviteToProjectController);
projectRouter.post("/:projectId/participants", acceptProjectInvitationController);
projectRouter.get("/:projectId/participants", authorizeParticipant, getParticipantsByProjectController);
projectRouter.patch("/:projectId/participants/:userId", authorizeParticipantByRole(["Owner"]), updateParticipantController)
projectRouter.delete("/:projectId/participants/:userId", passOne(authorizeParticipantByRole(["Owner"]), authorizeOwnUser), deleteParticipantController)

export default projectRouter;
