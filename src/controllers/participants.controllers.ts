import { Request, Response } from "express";
import { acceptProjectInvitationService, getProjectParticipantsService, inviteParticipantService, removeParticipantService, updateBoardRoleService } from "../services/participants.services";

export async function inviteToProjectController(req:Request, res:Response) {
    await inviteParticipantService(req.params.projectId, req.params.email, req.body);
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

export async function updateParticipantController(req:Request, res:Response) {
    const service = await updateBoardRoleService(req.params.projectId, req.params.userId, req.body);
    return res.status(200).json(service)
}

export async function deleteParticipantController(req:Request, res:Response) {
    await removeParticipantService(req.params.projectId, req.params.userId);
    return res.status(204).send()
}
