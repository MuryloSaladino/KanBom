import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import Member from "../entities/Member.entity";
import AppError from "../errors";
import Workspace from "../entities/Workspace.entity";

export async function authorizeMember(req:Request, res:Response, next:NextFunction) {
    
    const found = await AppDataSource.getRepository(Member).existsBy({
        userId: res.locals.userId,
        workspaceId: req.params.teamId
    });
    if(!found) throw new AppError("You do not have authorization for that", 403);
    
    next()
}

export async function authorizeTeamOwner(req:Request, res:Response, next:NextFunction) {
    
    const team = await AppDataSource
        .getRepository(Workspace)
        .findOneBy({ id: req.params.teamId });
    if(!team) throw new AppError("Team not found", 404);

    if(team.ownerId != res.locals.userId) 
        throw new AppError("You don't have authorization for that", 403);
    next()
}