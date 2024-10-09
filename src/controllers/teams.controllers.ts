import { Request, Response } from "express";
import { createWorkspaceService, deleteWorkspaceService, getWorkspacesByUserService, getWorkspaceService, updateWorkspaceService } from "../services/teams.services";

export async function createTeamController(req:Request, res:Response) {
    const service = await createWorkspaceService(res.locals.userId, req.body);
    return res.status(201).json(service);
}

export async function getTeamController(req:Request, res:Response) {
    const service = await getWorkspaceService(req.params.teamId);
    return res.status(200).json(service);
}

export async function getTeamsByUserController(req:Request, res:Response) {
    const service = await getWorkspacesByUserService(req.params.userId);
    return res.status(200).json(service);
}

export async function updateTeamController(req:Request, res:Response) {
    const service = await updateWorkspaceService(req.params.teamId, req.body);
    return res.status(200).json(service);
}

export async function deleteTeamController(req:Request, res:Response) {
    await deleteWorkspaceService(req.params.id);
    return res.status(204).send();
}
