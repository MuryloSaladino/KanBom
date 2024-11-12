import AppDataSource from "../data-source";
import Board from "../entities/Board.entity";
import CardList from "../entities/CardList.entity";
import AppError from "../errors";
import { ICardListPayload, ICardListUpdate } from "../types/cards.types";

export async function createCardListService(boardId:string, payload:ICardListPayload) {
    
    const board = await AppDataSource.getRepository(Board).findOneBy({ id: boardId });
    if(!board) throw new AppError("Board not found", 404);

    return await AppDataSource.getRepository(CardList).save({ ...payload, boardId });
}

export async function getCardListsByBoardService(boardId:string) {
    return await AppDataSource.getRepository(CardList).find({
        relations: { cards: true },
        where: { boardId },
    });
}

export async function updateCardListService(cardListId:string, payload:ICardListUpdate) {
    const repo = AppDataSource.getRepository(CardList);

    const list = await repo.findOneBy({ id: cardListId });
    if(!list) throw new AppError("Card list not found", 404);

    return await repo.save({ ...list, ...payload })
}

export async function deleteCardListService(cardListId:string) {
    const repo = AppDataSource.getRepository(CardList);
    
    const list = await repo.findOneBy({ id: cardListId })
    if(!list) throw new AppError("Card list not found", 404);

    await AppDataSource.getRepository(CardList).softRemove(list);
}
