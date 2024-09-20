import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import Member from "../entities/Member.entity";
import Team from "../entities/Team.entity";
import AppError from "../errors";
import { Role } from "../enums/Role";
import Participant from "../entities/Participant.entity";

export async function authorizeMember(req:Request, res:Response, next:NextFunction) {

    const repo = AppDataSource.getRepository(Member);
    
    if(!await repo.existsBy({ teamId: req.params.teamId, userId: res.locals.userId }))
        throw new AppError("You don't have authorization for that", 403);
    next()
}

export async function authorizeTeamOwner(req:Request, res:Response, next:NextFunction) {
    
    const repo = AppDataSource.getRepository(Team);

    const team = await repo.findOneBy({ id: req.params.teamId });
    if(!team) throw new AppError("Team not found", 404);

    if(team.ownerId != res.locals.userId) 
        throw new AppError("You don't have authorization for that", 403);
    next()
}

export async function authorizeParticipant(req:Request, res:Response, next:NextFunction) {
    
    const repo = AppDataSource.getRepository(Participant);
    
    if(!await repo.existsBy({ projectId: req.params.projectId, userId: res.locals.userId }))
        throw new AppError("You don't have authorization for that", 403);
    next()
}

export async function authorizeParticipantByRole(role:Role) {
    return async (req:Request, res:Response, next:NextFunction) => {

        const repo = AppDataSource.getRepository(Participant);

        const participant = await repo.findOneBy({ projectId: req.params.projectId, userId: res.locals.userId })
        if(!participant) throw new AppError("You are not a part of that project", 403);

        if(participant.role!.valueOf() < role.valueOf())
            throw new AppError("You don't have authorization for that", 403);

        next()
    }
}
