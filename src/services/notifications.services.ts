import AppDataSource from "../data-source";
import Notification from "../entities/Notification.entity";
import User from "../entities/User.entity";
import AppError from "../errors";

export async function getNotificationsService(userId:string) {
    
    const repo = AppDataSource.getRepository(User);
    
    const user = await repo.findOne({ 
        where: { id: userId },
        relations: { notifications: true } 
    })
    if(!user) throw new AppError("User not found", 404);

    return user.notifications || [];
}

export async function deleteNotificationService(notificationId:string) {
    
    const repo = AppDataSource.getRepository(Notification);

    const notification = await repo.findOneBy({ id: notificationId });
    if(!notification) throw new AppError("Notification not found", 404);

    await repo.save({ ...notification, deletedAt: new Date() });
}