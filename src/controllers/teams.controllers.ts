import { Request, Response } from "express";
import { createTeamService, getTeamService } from "../services/teams.services";

export async function createTeamController(req:Request, res:Response) {
    const service = await createTeamService(res.locals.userId, req.body);
    return res.status(201).json(service);
}

export async function getTeamController(req:Request, res:Response) {
    const service = await getTeamService(req.params.teamId);
    return res.status(200).json(service);
}
