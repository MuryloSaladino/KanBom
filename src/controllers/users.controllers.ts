import { Request, Response } from "express";
import { createUserService, deleteUserService, getUserService, updateUserDetailsService } from "../services/users.services";

export async function createUserController(req:Request, res:Response) {
    const service = await createUserService(req.body);
    return res.status(201).json(service)
}

export async function getUserByIdController(req:Request, res:Response) {
    const service = await getUserService(res.locals.userId);
    return res.status(201).json(service)
}

export async function updateUserController(req:Request, res:Response) {
    const service = await updateUserDetailsService(res.locals.userId, req.body);
    return res.status(200).json(service)
}

export async function deleteUserController(req:Request, res:Response) {
    await deleteUserService(res.locals.userId);
    return res.status(204).send();
}
