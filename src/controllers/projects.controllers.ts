import { Request, Response } from "express";
import { createProjectService, deleteProjectService, getProjectsByUserService, updateProjectService } from "../services/projects.services";

export async function createProjectController(req:Request, res:Response) {
    const service = await createProjectService(res.locals.userId, req.body);
    return res.status(201).json(service);
}

export async function getProjectsByUserController(req:Request, res:Response) {
    const service = await getProjectsByUserService(req.params.userId);
    return res.status(200).json(service);
}

export async function updateProjectController(req:Request, res:Response) {
    const service = await updateProjectService(req.params.projectId, req.body);
    return res.status(200).json(service);
}

export async function deleteProjectController(req:Request, res:Response) {
    await deleteProjectService(req.params.projectId);
    return res.status(204).send();
}
