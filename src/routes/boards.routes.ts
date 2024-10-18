import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { createBoardController, deleteBoardController, updateBoardController, updateBoardRoleController } from "../controllers/boards.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { createBoardSchema, updateboardRoleSchema } from "../schemas/boards.schemas";
import { authorizeByBoardRole } from "../middlewares/boards.middlewares";

const boardsRouter = Router();

boardsRouter.use(authenticate);

boardsRouter.post("/workspaces/:workspaceId", validateBody(createBoardSchema), createBoardController);
boardsRouter.patch("/:boardId", authorizeByBoardRole(["Editor", "Owner"]), updateBoardController);
boardsRouter.patch("/:boardId/users/:userId", authorizeByBoardRole(["Owner"]), validateBody(updateboardRoleSchema), updateBoardRoleController)
boardsRouter.delete("/:boardId", authorizeByBoardRole(["Owner"]), deleteBoardController);

export default boardsRouter;
