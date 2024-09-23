import { Request, Response } from "express";
import { createTeamService } from "../services/teams.services";

export async function createTeamController(req:Request, res:Response) {
    const service = await createTeamService(res.locals.userId, req.body);
    return res.status(201).json(service);
}

