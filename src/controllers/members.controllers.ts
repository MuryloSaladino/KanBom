import { Request, Response } from "express";
import { getTeamMembersService } from "../services/members.services";

export async function getTeamMembersController(req:Request, res:Response) {
    const service = await getTeamMembersService(req.params.teamId);
    return res.status(200).json(service);
}
