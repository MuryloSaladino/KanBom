import { Request, Response } from "express";
import { createProjectService, getProjectsByUserService } from "../services/projects.services";

export async function createProjectController(req:Request, res:Response) {
    const service = await createProjectService(res.locals.userId, req.body);
    return res.status(201).json(service);
}

export async function getProjectsByUserController(req:Request, res:Response) {
    const service = await getProjectsByUserService(req.params.userId);
    return res.status(200).json(service);
}
