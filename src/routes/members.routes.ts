import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { getTeamMembersController, inviteToTeamController } from "../controllers/members.controllers";
import { authorizeTeamOwner } from "../middlewares/authorize.middleware";

const memberRouter = Router();

memberRouter.get("/teams/:teamId", authenticate, getTeamMembersController);
memberRouter.post("/teams/:teamId/users/:userId", authenticate, authorizeTeamOwner, inviteToTeamController);

export default memberRouter;