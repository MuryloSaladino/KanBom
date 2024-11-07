import { Request, Response } from "express";
import UsersService from "../services/users.services";

const service = new UsersService();

export async function createUserController(req:Request, res:Response) {
    const user = await service.create(req.body);
    return res.status(201).json({ ...user, password: undefined })
}

export async function getOwnUserController(req:Request, res:Response) {
    const user = await service.findById(res.locals.userId, { details: true });
    return res.status(201).json(user)
}

export async function updateOwnUserController(req:Request, res:Response) {
    const user = await service.update(res.locals.userId, req.body);
    return res.status(200).json({ ...user, password: undefined })
}

export async function deleteOwnUserController(req:Request, res:Response) {
    await service.delete(res.locals.userId);
    return res.status(204).send();
}
