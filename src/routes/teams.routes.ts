import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createTeamController, deleteTeamController, getTeamController, getTeamsByUserController, updateTeamController } from "../controllers/teams.controllers";
import { authorizeMember, authorizeTeamOwner } from "../middlewares/teams.middlewares";
import validateBody from "../middlewares/validateBody.middleware";
import { createTeamSchema, updateTeamSchema } from "../schemas/teams.schemas";
import { acceptInviteController, getTeamMembersController, inviteToTeamController, removeMemberController } from "../controllers/members.controllers";
import { passOne } from "../middlewares/utility.middlewares";
import { authorizeOwnUser } from "../middlewares/users.middlewares";

const teamRouter = Router();

teamRouter.use(authenticate)

teamRouter.post("", validateBody(createTeamSchema), createTeamController);
teamRouter.get("/:teamId", authorizeMember, getTeamController);
teamRouter.patch("/:teamId", authorizeTeamOwner, validateBody(updateTeamSchema), updateTeamController);
teamRouter.delete("/:teamId", authorizeTeamOwner, deleteTeamController);

teamRouter.get("/users/:userId", getTeamsByUserController);

teamRouter.post("/:teamId/members/:email", authorizeTeamOwner, inviteToTeamController);
teamRouter.post("/:teamId/members", acceptInviteController);
teamRouter.get("/:teamId/members", authorizeMember, getTeamMembersController);
teamRouter.delete("/:teamId/members/:userId", passOne(authorizeTeamOwner, authorizeOwnUser), removeMemberController);

export default teamRouter;