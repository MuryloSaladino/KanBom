import { Request, Response } from "express";
import { createWorkspaceService, deleteWorkspaceService, getWorkspacesByUserService, getWorkspaceService, updateWorkspaceService } from "../services/workspaces.services";

export async function createWorkspaceController(req:Request, res:Response) {
    const workspace = await createWorkspaceService(res.locals.userId, req.body);
    return res.status(201).json(workspace);
}

export async function getWorkspaceController(req:Request, res:Response) {
    const workspace = await getWorkspaceService(req.params.workspaceId);
    return res.status(200).json(workspace);
}

export async function getWorkspacesByUserController(req:Request, res:Response) {
    const workspaces = await getWorkspacesByUserService(req.params.userId);
    return res.status(200).json(workspaces);
}

export async function updateWorkspaceController(req:Request, res:Response) {
    const workspace = await updateWorkspaceService(req.params.workspaceId, req.body);
    return res.status(200).json(workspace);
}

export async function deleteWorkspaceController(req:Request, res:Response) {
    await deleteWorkspaceService(req.params.workspaceId);
    return res.status(204).send();
}
