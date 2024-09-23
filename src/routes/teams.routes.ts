import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createTeamController, getTeamController } from "../controllers/teams.controllers";
import { authorizeMember } from "../middlewares/authorize.middleware";

const teamRouter = Router();

teamRouter.post("", authenticate, createTeamController);
teamRouter.get("/:teamId", authenticate, getTeamController);

export default teamRouter;