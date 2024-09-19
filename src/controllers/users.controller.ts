import { Request, Response } from "express";
import { createUserService } from "../services/users.services";

export async function createUserController(req:Request, res:Response) {
    const service = await createUserService(req.body);
    return res.status(201).json(service)
}