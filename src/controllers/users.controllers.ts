import { Request, Response } from "express";
import { createUserService, deleteUserService, getUserService, updateUserDetailsService } from "../services/users.services";

export async function createUserController(req:Request, res:Response) {
    const user = await createUserService(req.body);
    return res.status(201).json(user)
}

export async function getOwnUserController(req:Request, res:Response) {
    const user = await getUserService(res.locals.userId);
    return res.status(201).json(user)
}

export async function updateOwnUserController(req:Request, res:Response) {
    const user = await updateUserDetailsService(res.locals.userId, req.body);
    return res.status(200).json(user)
}

export async function deleteOwnUserController(req:Request, res:Response) {
    await deleteUserService(res.locals.userId);
    return res.status(204).send();
}
