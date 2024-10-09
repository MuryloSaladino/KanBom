import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { acceptWorkspaceInviteController, getWorkspaceMembersController, inviteMemberController, removeMemberController } from "../controllers/members.controllers";
import { authorizeMember, authorizeTeamOwner } from "../middlewares/teams.middlewares";
import { passOne } from "../middlewares/utility.middlewares";
import { authorizeOwnUser } from "../middlewares/users.middlewares";

const membersRouter = Router();

membersRouter.use(authenticate);

membersRouter.post("/:email", authorizeTeamOwner, inviteMemberController);
membersRouter.post("", acceptWorkspaceInviteController);
membersRouter.get("", authorizeMember, getWorkspaceMembersController);
membersRouter.delete("/:userId", passOne(authorizeTeamOwner, authorizeOwnUser), removeMemberController);

export default membersRouter;