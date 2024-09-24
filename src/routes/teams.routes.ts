import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createTeamController, deleteTeamController, getTeamController, updateTeamController } from "../controllers/teams.controllers";
import { authorizeMember, authorizeTeamOwner } from "../middlewares/authorize.middleware";

const teamRouter = Router();

teamRouter.post("", authenticate, createTeamController);
teamRouter.get("/:teamId", authenticate, authorizeMember, getTeamController);
teamRouter.patch("/:teamId", authenticate, authorizeTeamOwner, updateTeamController);
teamRouter.delete("/:teamId", authenticate, authorizeTeamOwner, deleteTeamController);

export default teamRouter;