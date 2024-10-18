import { Request, Response } from "express";
import { createBoardService, deleteBoardService, updateBoardRoleService, updateBoardService } from "../services/boards.services";

export async function createBoardController(req:Request, res:Response) {
    const board = await createBoardService(res.locals.userId, req.params.workspaceId, req.body);
    return res.status(201).json(board);
}

export async function updateBoardController(req:Request, res:Response) {
    const board = await updateBoardService(req.params.boardId, req.body);
    return res.status(200).json(board);
}

export async function updateBoardRoleController(req:Request, res:Response) {
    const role = await updateBoardRoleService(req.params.boardId, req.params.userId, req.body);
    return res.status(200).json(role);
}

export async function deleteBoardController(req:Request, res:Response) {
    await deleteBoardService(req.params.boardId);
    return res.status(204).send();
}
