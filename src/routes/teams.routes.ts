import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createTeamController, deleteTeamController, getTeamController, getTeamsByUserController, updateTeamController } from "../controllers/teams.controllers";
import { authorizeMember, authorizeTeamOwner } from "../middlewares/teams.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { createTeamSchema } from "../schemas/teams.schemas";

const teamRouter = Router();

teamRouter.post("", authenticate, validateBody(createTeamSchema), createTeamController);
teamRouter.get("/:teamId", authenticate, authorizeMember, getTeamController);
teamRouter.get("/users/:userId", authenticate, getTeamsByUserController);
teamRouter.patch("/:teamId", authenticate, authorizeTeamOwner, updateTeamController);
teamRouter.delete("/:teamId", authenticate, authorizeTeamOwner, deleteTeamController);

export default teamRouter;