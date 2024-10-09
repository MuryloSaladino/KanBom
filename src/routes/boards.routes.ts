import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createBoardController, deleteBoardController, updateBoardController } from "../controllers/boards.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { createProjectSchema } from "../schemas/projects.schemas";
import { authorizeParticipantByRole } from "../middlewares/projects.middlewares";

const boardsRouter = Router();

boardsRouter.use(authenticate);

boardsRouter.post("", validateBody(createProjectSchema), createBoardController);
boardsRouter.patch("/:boardId", authorizeParticipantByRole(["Editor", "Owner"]), updateBoardController);
boardsRouter.delete("/:boardId", authorizeParticipantByRole(["Owner"]), deleteBoardController);

export default boardsRouter;
