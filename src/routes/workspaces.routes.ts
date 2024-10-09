import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createWorkspaceController, deleteWorkspaceController, getWorkspaceController, getWorkspacesByUserController, updateWorkspaceController } from "../controllers/workspaces.controllers";
import { authorizeMember, authorizeWorkspaceOwner } from "../middlewares/workspaces.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../schemas/workspaces.schemas";

const workspacesRouter = Router();

workspacesRouter.use(authenticate);

workspacesRouter.post("", validateBody(createWorkspaceSchema), createWorkspaceController);
workspacesRouter.get("/:teamId", authorizeMember, getWorkspaceController);
workspacesRouter.get("/users/:userId", getWorkspacesByUserController);
workspacesRouter.patch("/:teamId", authorizeWorkspaceOwner, validateBody(updateWorkspaceSchema), updateWorkspaceController);
workspacesRouter.delete("/:teamId", authorizeWorkspaceOwner, deleteWorkspaceController);

export default workspacesRouter;