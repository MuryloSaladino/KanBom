import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import Member from "../entities/Member.entity";
import AppError from "../errors";
import Workspace from "../entities/Workspace.entity";
import Board from "../entities/Board.entity";

export async function authorizeMember(req:Request, res:Response, next:NextFunction) {
    
    const found = await AppDataSource.getRepository(Member).existsBy({
        userId: res.locals.userId,
        workspaceId: req.params.workspaceId
    });
    if(!found) throw new AppError("You do not have authorization for that", 403);
    
    next()
}

export async function authorizeMemberByBoard(req:Request, res:Response, next:NextFunction) {
    
    const board = await AppDataSource.getRepository(Board).findOneBy({ id: req.params.boardId })
    if(!board) throw new AppError("Board not found", 404)

    const found = await AppDataSource.getRepository(Member).existsBy({
        userId: res.locals.userId,
        workspaceId: board.workspaceId
    });
    if(!found) throw new AppError("You do not have authorization for that", 403);
    
    next()
}

export async function authorizeWorkspaceOwner(req:Request, res:Response, next:NextFunction) {
    
    const workspace = await AppDataSource
        .getRepository(Workspace)
        .findOneBy({ id: req.params.workspaceId });
    if(!workspace) throw new AppError("Workspace not found", 404);

    if(workspace.ownerId != res.locals.userId) 
        throw new AppError("You don't have authorization for that", 403);
    next()
}