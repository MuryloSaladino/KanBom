import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { acceptInviteController, getTeamMembersController, inviteToTeamController } from "../controllers/members.controllers";
import { authorizeTeamOwner } from "../middlewares/projects.middlewares";

const memberRouter = Router();

memberRouter.get("/teams/:teamId", authenticate, getTeamMembersController);
memberRouter.post("/teams/:teamId/users/:userId", authenticate, authorizeTeamOwner, inviteToTeamController);
memberRouter.post("/invite/:token", authenticate, acceptInviteController);

export default memberRouter;