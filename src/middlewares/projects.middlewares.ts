import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import AppError from "../errors";
import Participant from "../entities/Participant.entity";
import { TParticipantRole } from "../types/projects.types";

export async function authorizeParticipant(req:Request, res:Response, next:NextFunction) {
    
    const found = await AppDataSource.getRepository(Participant).existsBy({
        userId: res.locals.userId,  
        projectId: req.params.projectId,
    })
    if(!found) throw new AppError("You do not have authorization for that", 403)

    next()
}

export function authorizeParticipantByRole(roles:TParticipantRole[]) {
    return async (req:Request, res:Response, next:NextFunction) => {

        const found = await AppDataSource.getRepository(Participant).findOneBy({
            userId: res.locals.userId,  
            projectId: req.params.projectId,
        });
        if(!found) throw new AppError("You are not a part of that project", 403);
        
        if(!roles.includes(found.role!))
            throw new AppError("You don't have authorization for that", 403);

        next()
    }
}
