import { Request, Response } from "express";
import { acceptWorkspaceInviteService, getWorkspaceMembersService, inviteMemberService, removeMemberService } from "../services/members.services";

export async function getWorkspaceMembersController(req:Request, res:Response) {
    const members = await getWorkspaceMembersService(req.params.workspaceId);
    return res.status(200).json(members);
}

export async function inviteMemberController(req:Request, res:Response) {
    await inviteMemberService(req.params.email, req.params.workspaceId);
    return res.status(204).send();
}

export async function acceptWorkspaceInviteController(req:Request, res:Response) {
    await acceptWorkspaceInviteService(req.params.workspaceId, res.locals.userId);
    return res.status(204).send();
}

export async function removeMemberController(req:Request, res:Response) {
    await removeMemberService(req.params.workspaceId, req.params.userId);
    return res.status(204).send();
}
