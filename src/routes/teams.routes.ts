import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createTeamController } from "../controllers/teams.controllers";

const teamRouter = Router();

teamRouter.post("", authenticate, createTeamController);

export default teamRouter;