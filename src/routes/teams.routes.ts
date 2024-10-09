import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createWorkspaceController, deleteWorkspaceController, getWorkspaceController, getWorkspacesByUserController, updateWorkspaceController } from "../controllers/workspaces.controllers";
import { authorizeMember, authorizeTeamOwner } from "../middlewares/teams.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { createTeamSchema, updateTeamSchema } from "../schemas/teams.schemas";
import { acceptWorkspaceInviteController, getWorkspaceMembersController, inviteMemberController, removeMemberController } from "../controllers/members.controllers";
import { passOne } from "../middlewares/utility.middlewares";
import { authorizeOwnUser } from "../middlewares/users.middlewares";

const teamRouter = Router();

teamRouter.use(authenticate)

teamRouter.post("", validateBody(createTeamSchema), createWorkspaceController);
teamRouter.get("/:teamId", authorizeMember, getWorkspaceController);
teamRouter.patch("/:teamId", authorizeTeamOwner, validateBody(updateTeamSchema), updateWorkspaceController);
teamRouter.delete("/:teamId", authorizeTeamOwner, deleteWorkspaceController);

teamRouter.get("/users/:userId", getWorkspacesByUserController);

teamRouter.post("/:teamId/members/:email", authorizeTeamOwner, inviteMemberController);
teamRouter.post("/:teamId/members", acceptWorkspaceInviteController);
teamRouter.get("/:teamId/members", authorizeMember, getWorkspaceMembersController);
teamRouter.delete("/:teamId/members/:userId", passOne(authorizeTeamOwner, authorizeOwnUser), removeMemberController);

export default teamRouter;