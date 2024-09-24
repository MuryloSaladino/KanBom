import { Request, Response } from "express";
import { addUserToProjectService, createProjectService } from "../services/projects.services";
import AppError from "../errors";

export async function createProjectController(req: Request, res:Response)
{
    const service = await createProjectService(req.body.name, req.body.thumbnail);

    if(!service || !service.id)
        throw new AppError("Failed to create project.", 500);

    await addUserToProjectService(res.locals.userId, service.id, "Owner");
    return res.status(201).json(service);
}

export async function addUserToProjectController(req: Request, res: Response) 
{
    const service = await addUserToProjectService(res.locals.userId, req.body.projectId, req.body.role);
    return res.status(201).json(service);
}

export async function deleteProjectController(req: Request, res: Response)
{
    
}