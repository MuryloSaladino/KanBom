import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import AppError from "../errors";
import BoardRole from "../entities/BoardRole.entity";
import { TBoardRole } from "../types/boards.types";

export function authorizeByBoardRole(roles:TBoardRole[]) {
    return async (req:Request, res:Response, next:NextFunction) => {

        const found = await AppDataSource.getRepository(BoardRole).findOneBy({
            userId: res.locals.userId,  
            boardId: req.params.boardId,
        });
        if(!found) throw new AppError("You are not a part of that project", 403);
        
        if(!roles.includes(found.role!))
            throw new AppError("You don't have authorization for that", 403);

        next()
    }
}
