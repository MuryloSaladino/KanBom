import AppDataSource from "../data-source";
import Notification from "../entities/Notification.entity";

export async function getNotificationsService(userId:string) {
    return AppDataSource
        .getRepository(Notification)
        .findBy({ userId })
}

export async function deleteNotificationService(userId:string, notificationId:string) {
    await AppDataSource
        .getRepository(Notification)
        .softRemove({ userId, id: notificationId })
}