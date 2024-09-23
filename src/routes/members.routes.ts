import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { getTeamMembersController } from "../controllers/members.controllers";

const memberRouter = Router();

memberRouter.get("/teams/:teamId", authenticate, getTeamMembersController);

export default memberRouter;