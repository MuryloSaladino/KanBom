import { Request, Response } from "express";
import { createProjectService } from "../services/projects.services";

export async function createProjectController(req:Request, res:Response) {
    const service = await createProjectService(res.locals.userId, req.body);
    return res.status(201).json(service);
}
