import { Request, Response } from "express";
import { acceptProjectInvitationService, getProjectParticipantsService, inviteToProjectService } from "../services/participants.services";

export async function inviteToProjectController(req:Request, res:Response) {
    await inviteToProjectService(req.params.projectId, req.params.email, req.body);
    return res.status(204).send()
}

export async function acceptProjectInvitationController(req:Request, res:Response) {
    await acceptProjectInvitationService(req.params.projectId, res.locals.userId);
    return res.status(204).send()
}

export async function getParticipantsByProjectController(req:Request, res:Response) {
    const service = await getProjectParticipantsService(req.params.projectId);
    return res.status(200).json(service)
}