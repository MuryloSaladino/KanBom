import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createTeamController, deleteTeamController, getTeamController, getTeamsByUserController, updateTeamController } from "../controllers/teams.controllers";
import { authorizeMember, authorizeTeamOwner } from "../middlewares/teams.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { createTeamSchema, updateTeamSchema } from "../schemas/teams.schemas";

const teamRouter = Router();

teamRouter.use(authenticate)

teamRouter.post("", validateBody(createTeamSchema), createTeamController);
teamRouter.get("/:teamId", authorizeMember, getTeamController);
teamRouter.get("/users/:userId", getTeamsByUserController);
teamRouter.patch("/:teamId", authorizeTeamOwner, validateBody(updateTeamSchema), updateTeamController);
teamRouter.delete("/:teamId", authorizeTeamOwner, deleteTeamController);

export default teamRouter;