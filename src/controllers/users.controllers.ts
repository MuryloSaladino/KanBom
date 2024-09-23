import { Request, Response } from "express";
import { createUserService, deleteUserService, getUserService, getUsersService, updateUserDetailsService } from "../services/users.services";

export async function createUserController(req:Request, res:Response) {
    const service = await createUserService(req.body);
    return res.status(201).json(service)
}

export async function getUserByIdController(req:Request, res:Response) {
    const service = await getUserService(req.params.userId);
    return res.status(201).json(service)
}

export async function updateUserController(req:Request, res:Response) {
    const service = await updateUserDetailsService(req.params.userId, req.body);
    return res.status(200).json(service)
}

export async function deleteUserController(req:Request, res:Response) {
    await deleteUserService(req.params.userId);
    return res.status(204).send();
}

export async function getUsersController(req:Request, res:Response) {
    const service = await getUsersService(req.query.teamId as string | undefined);
    return res.status(200).json(service);
}
