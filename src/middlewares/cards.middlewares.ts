import { NextFunction, Request, Response } from "express"
import AppDataSource from "../data-source"
import AppError from "../errors"
import { IBoardRole } from "../types/boards.types"


export function authorizeByCardAndBoardRole(roles:IBoardRole[]) {
    return async (req:Request, res:Response, next:NextFunction) => {

        const found = await AppDataSource
            .createQueryBuilder("board_roles", "br")
            .leftJoin("boards", "b", "br.boardId = b.id")
            .leftJoin("users", "u", "br.userId = u.id")
            .leftJoin("card_lists", "cl", "cl.boardId = b.id")
            .leftJoin("cards", "c", "c.cardListId = cl.id")
            .where("c.id = :cardId", { cardId: req.params.cardId })
            .andWhere("u.id = :userId", { userId: res.locals.userId })
            .getRawOne()

        if(!found || !roles.includes(found.br_role!)) 
            throw new AppError("You don't have authorization for that", 403)

        next()
    }
}

export function authorizeByCardListAndBoardRole(roles:IBoardRole[]) {
    return async (req:Request, res:Response, next:NextFunction) => {

        const found = await AppDataSource
            .createQueryBuilder("board_roles", "br")
            .leftJoin("boards", "b", "br.boardId = b.id")
            .leftJoin("users", "u", "br.userId = u.id")
            .leftJoin("card_lists", "cl", "cl.boardId = b.id")
            .where("cl.id = :cardListId", { cardListId: req.params.cardListId })
            .andWhere("u.id = :userId", { userId: res.locals.userId })
            .getRawOne()

        if(!found || !roles.includes(found.br_role!)) 
            throw new AppError("You don't have authorization for that", 403)

        next()
    }
}