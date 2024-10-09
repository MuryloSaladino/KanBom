import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createWorkspaceController, deleteWorkspaceController, getWorkspaceController, getWorkspacesByUserController, updateWorkspaceController } from "../controllers/workspaces.controllers";
import { authorizeMember, authorizeTeamOwner } from "../middlewares/teams.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { createTeamSchema, updateTeamSchema } from "../schemas/teams.schemas";

const workspacesRouter = Router();

workspacesRouter.use(authenticate);

workspacesRouter.post("", validateBody(createTeamSchema), createWorkspaceController);
workspacesRouter.get("/:teamId", authorizeMember, getWorkspaceController);
workspacesRouter.get("/users/:userId", getWorkspacesByUserController);
workspacesRouter.patch("/:teamId", authorizeTeamOwner, validateBody(updateTeamSchema), updateWorkspaceController);
workspacesRouter.delete("/:teamId", authorizeTeamOwner, deleteWorkspaceController);

export default workspacesRouter;