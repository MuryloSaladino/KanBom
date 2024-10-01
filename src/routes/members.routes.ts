import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { acceptInviteController, getTeamMembersController, inviteToTeamController, removeMemberController } from "../controllers/members.controllers";
import { authorizeMember, authorizeTeamOwner } from "../middlewares/teams.middlewares";
import { passOne } from "../middlewares/utility.middlewares";
import { authorizeOwnUser } from "../middlewares/users.middlewares";

const memberRouter = Router();

memberRouter.use(authenticate)

memberRouter.post("/invite/:teamId", acceptInviteController);
memberRouter.get("/teams/:teamId", authorizeMember, getTeamMembersController);
memberRouter.post("/teams/:teamId/users/:userId", authorizeTeamOwner, inviteToTeamController);
memberRouter.delete("/teams/:teamId/users/:userId", passOne(authorizeTeamOwner, authorizeOwnUser), removeMemberController);

export default memberRouter;
