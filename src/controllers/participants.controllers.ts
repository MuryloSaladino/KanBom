import { Request, Response } from "express";
import { inviteToProjectService } from "../services/participants.services";

export async function inviteToProjectController(req:Request, res:Response) {
    await inviteToProjectService(req.params.projectId, req.params.email);
    return res.status(204).send()
}
