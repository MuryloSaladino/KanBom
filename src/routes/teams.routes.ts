import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createTeamController, deleteTeamController, getTeamController, getTeamsByUserController, updateTeamController } from "../controllers/teams.controllers";
import { authorizeMember, authorizeTeamOwner } from "../middlewares/authorize.middleware";

const teamRouter = Router();

teamRouter.post("", authenticate, createTeamController);
teamRouter.get("/:teamId", authenticate, authorizeMember, getTeamController);
teamRouter.get("/users/:userId", authenticate, getTeamsByUserController);
teamRouter.patch("/:teamId", authenticate, authorizeTeamOwner, updateTeamController);
teamRouter.delete("/:teamId", authenticate, authorizeTeamOwner, deleteTeamController);

export default teamRouter;