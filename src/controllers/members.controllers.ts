import { Request, Response } from "express";
import { acceptTeamInvitationService, getTeamMembersService, inviteMemberService, removeMemberService } from "../services/members.services";

export async function getTeamMembersController(req:Request, res:Response) {
    const service = await getTeamMembersService(req.params.teamId);
    return res.status(200).json(service);
}

export async function inviteToTeamController(req:Request, res:Response) {
    await inviteMemberService(req.params.userId, req.params.teamId);
    return res.status(204).send();
}

export async function acceptInviteController(req:Request, res:Response) {
    await acceptTeamInvitationService(req.params.teamId, res.locals.userId);
    return res.status(204).send();
}

export async function removeMemberController(req:Request, res:Response) {
    await removeMemberService(req.params.userId, req.params.userId);
    return res.status(204).send();
}
