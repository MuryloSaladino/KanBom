import { Request, Response } from "express";
import { createTeamService, deleteTeamService, getTeamService, updateTeamService } from "../services/teams.services";

export async function createTeamController(req:Request, res:Response) {
    const service = await createTeamService(res.locals.userId, req.body);
    return res.status(201).json(service);
}

export async function getTeamController(req:Request, res:Response) {
    const service = await getTeamService(req.params.teamId);
    return res.status(200).json(service);
}

export async function updateTeamController(req:Request, res:Response) {
    const service = await updateTeamService(req.params.teamId, req.body);
    return res.status(200).json(service);
}

export async function deleteTeamController(req:Request, res:Response) {
    await deleteTeamService(req.params.id);
    return res.status(204).send();
}
