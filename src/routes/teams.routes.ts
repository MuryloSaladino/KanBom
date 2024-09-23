import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createTeamController, getTeamMembersController } from "../controllers/teams.controllers";

const teamRouter = Router();

teamRouter.post("", authenticate, createTeamController);
teamRouter.get("/:teamId", authenticate, getTeamMembersController);

export default teamRouter;