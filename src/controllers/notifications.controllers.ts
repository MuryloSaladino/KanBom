import { Request, Response } from "express";
import { deleteNotificationService, getNotificationsService } from "../services/notifications.services";

export async function getNotificationsController(req:Request, res:Response) {
    const notifications = await getNotificationsService(res.locals.userId);
    return res.status(200).json(notifications);
}

export async function deleteNotificationController(req:Request, res:Response) {
    await deleteNotificationService(res.locals.userId, req.params.notificationId);
    return res.status(204).send();
}
