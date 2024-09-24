import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import Member from "../entities/Member.entity";
import Team from "../entities/Team.entity";
import AppError from "../errors";
import { Role } from "../enums/Role";
import Participant from "../entities/Participant.entity";

export async function authorizeMember(req:Request, res:Response, next:NextFunction) {

    const found = await AppDataSource
        .getRepository(Member)
        .createQueryBuilder("m")
        .where("m.userId = :userId", { userId: res.locals.userId })
        .andWhere("m.teamId = :teamId", { teamId: req.params.teamId })
        .getExists();
    if(!found) throw new AppError("You do not have authorization for that", 403)
    
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
    
    const found = await AppDataSource
        .getRepository(Participant)
        .createQueryBuilder("p")
        .where("p.userId = :userId", { userId: res.locals.userId })
        .andWhere("p.projectId = :projectId", { teamId: req.params.projectId })
        .getExists();
    if(!found) throw new AppError("You do not have authorization for that", 403)

    next()
}

export async function authorizeParticipantByRole(role:Role) {
    return async (req:Request, res:Response, next:NextFunction) => {

        const found = await AppDataSource
            .getRepository(Participant)
            .createQueryBuilder("p")
            .where("p.userId = :userId", { userId: res.locals.userId })
            .andWhere("p.projectId = :projectId", { teamId: req.params.projectId })
            .getOne();
        if(!found) throw new AppError("You are not a part of that project", 403);
        
        if(found.role!.valueOf() < role.valueOf())
            throw new AppError("You don't have authorization for that", 403);

        next()
    }
}
