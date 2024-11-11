import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createWorkspaceController, deleteWorkspaceController, getWorkspaceController, getWorkspacesByUserController, updateWorkspaceController } from "../controllers/workspaces.controllers";
import { authorizeMember, authorizeWorkspaceOwner } from "../middlewares/workspaces.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { WorkspaceSchema } from "../schemas/workspaces.schemas";

const workspacesRouter = Router();

workspacesRouter.use(authenticate);

workspacesRouter.post("", validateBody(WorkspaceSchema), createWorkspaceController);
workspacesRouter.get("/:workspaceId", authorizeMember, getWorkspaceController);
workspacesRouter.get("/users/:userId", getWorkspacesByUserController);
workspacesRouter.patch("/:workspaceId", authorizeWorkspaceOwner, validateBody(WorkspaceSchema), updateWorkspaceController);
workspacesRouter.delete("/:workspaceId", authorizeWorkspaceOwner, deleteWorkspaceController);

export default workspacesRouter;