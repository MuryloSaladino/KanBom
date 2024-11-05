import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { authorizeByBoardRole } from "../middlewares/boards.middlewares";
import { createCardListController, deleteCardListController, getCardListsByBoardController, updateCardListController } from "../controllers/cardList.controllers";

const cardListRouter = Router();

cardListRouter.use(authenticate);

cardListRouter.post("/boards/:boardId", authorizeByBoardRole(["Editor", "Owner"]), createCardListController);
cardListRouter.get("/boards/:boardId", authorizeByBoardRole(["Reader", "Editor", "Owner"]), getCardListsByBoardController);
cardListRouter.patch("/:cardListId", authorizeByBoardRole(["Editor", "Owner"]), updateCardListController);
cardListRouter.delete("/:cardListId", authorizeByBoardRole(["Editor", "Owner"]), deleteCardListController);

export default cardListRouter;