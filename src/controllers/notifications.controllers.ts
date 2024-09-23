import { Request, Response } from "express";
import { getNotificationsService } from "../services/notifications.services";

export async function getNotificationsController(req:Request, res:Response) {
    const service = await getNotificationsService(res.locals.userId);
    return res.status(200).json(service);
}