import { Request, Response } from "express";
import { createCardListService, deleteCardListService, getCardListsByBoardService, updateCardListService } from "../services/cardList.services";


export async function createCardListController(req:Request, res:Response) {
    const cardList = await createCardListService(req.params.boardId, req.body);
    return res.status(201).json(cardList);
}

export async function getCardListsByBoardController(req:Request, res:Response) {
    const cardLists = await getCardListsByBoardService(req.params.boardId);
    return res.status(200).json(cardLists);
}

export async function updateCardListController(req:Request, res:Response) {
    const cardList = await updateCardListService(req.params.cardListId, req.body);
    return res.status(200).json(cardList);
}

export async function deleteCardListController(req:Request, res:Response) {
    await deleteCardListService(req.params.cardListId);
    return res.status(204).send();
}
