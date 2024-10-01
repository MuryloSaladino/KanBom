import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { acceptInviteController, getTeamMembersController, inviteToTeamController, removeMemberController } from "../controllers/members.controllers";
import { authorizeTeamOwner } from "../middlewares/teams.middlewares";
import { passOne } from "../middlewares/utility.middlewares";
import { authorizeOwnUser } from "../middlewares/users.middlewares";

const memberRouter = Router();

memberRouter.get("/teams/:teamId", authenticate, getTeamMembersController);
memberRouter.post("/invite/:teamId", authenticate, acceptInviteController);
memberRouter.post("/teams/:teamId/users/:userId", authenticate, authorizeTeamOwner, inviteToTeamController);
memberRouter.delete("/teams/:teamId/users/:userId", authenticate, passOne(authorizeTeamOwner, authorizeOwnUser), removeMemberController);

export default memberRouter;
